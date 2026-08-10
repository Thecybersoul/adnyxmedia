import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { company } from "@/lib/data/site";

// Initialize Resend with API key from environment variables
// During build, use a placeholder if key is not set
const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

// Rate limiting map (in-memory, resets on server restart)
// For production, consider using Redis or a proper rate limiting service
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  company: z.string().min(2, "Company name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

// Rate limiting helper
function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(identifier);

  if (!limit || now > limit.resetTime) {
    // Reset or create new limit (5 requests per 15 minutes)
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + 15 * 60 * 1000, // 15 minutes
    });
    return true;
  }

  if (limit.count >= 5) {
    return false; // Rate limit exceeded
  }

  limit.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get client identifier for rate limiting (IP address)
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : request.headers.get("x-real-ip") || "unknown";

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a few minutes." },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = contactFormSchema.parse(body);

    // If Resend is not configured, return fallback response
    if (!resend || !process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY not configured - email not sent");
      return NextResponse.json(
        {
          success: true,
          message: "Form submitted successfully (email service not configured)",
          fallbackEmail: company.email,
        },
        { status: 200 }
      );
    }

    // Send email using Resend
    const emailHtml = generateEmailHtml(validatedData);
    const emailText = generateEmailText(validatedData);

    const emailResponse = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to: process.env.CONTACT_EMAIL || company.email,
      replyTo: validatedData.email,
      subject: `New enquiry from ${validatedData.name} (${validatedData.company})`,
      html: emailHtml,
      text: emailText,
    });

    if (emailResponse.error) {
      console.error("Resend error:", emailResponse.error);
      return NextResponse.json(
        { error: "Failed to send email. Please try again or contact us directly." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your enquiry has been sent successfully. We'll be in touch within one business day.",
        emailId: emailResponse.data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid form data",
          details: error.issues.map((e: z.ZodIssue) => ({ field: e.path.join("."), message: e.message })),
        },
        { status: 400 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again or contact us directly." },
      { status: 500 }
    );
  }
}

// Generate HTML email template
function generateEmailHtml(data: ContactFormData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #7c5cff 0%, #2ee6d6 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 24px;">New ADNYX Enquiry</h1>
  </div>
  
  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 12px 12px;">
    <h2 style="color: #7c5cff; margin-top: 0;">Contact Details</h2>
    
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;"><strong>Name:</strong></td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">${escapeHtml(data.name)}</td>
      </tr>
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;"><strong>Company:</strong></td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">${escapeHtml(data.company)}</td>
      </tr>
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;"><strong>Email:</strong></td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;"><a href="mailto:${escapeHtml(data.email)}" style="color: #7c5cff;">${escapeHtml(data.email)}</a></td>
      </tr>
      ${data.phone ? `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;"><strong>Phone:</strong></td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;"><a href="tel:${escapeHtml(data.phone)}" style="color: #7c5cff;">${escapeHtml(data.phone)}</a></td>
      </tr>
      ` : ""}
      ${data.budget ? `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;"><strong>Budget:</strong></td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">${escapeHtml(data.budget)}</td>
      </tr>
      ` : ""}
    </table>
    
    <h2 style="color: #7c5cff; margin-top: 30px;">Message</h2>
    <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #7c5cff; white-space: pre-wrap;">${escapeHtml(data.message)}</div>
    
    <div style="margin-top: 30px; padding: 20px; background: #fff3cd; border-radius: 8px; border-left: 4px solid #ffc107;">
      <p style="margin: 0; font-size: 14px; color: #856404;">
        <strong>⏱️ Response time goal:</strong> Reply within one business day
      </p>
    </div>
  </div>
  
  <div style="margin-top: 20px; text-align: center; color: #999; font-size: 12px;">
    <p>Sent from ADNYX website contact form</p>
    <p>Time: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</p>
  </div>
</body>
</html>
  `.trim();
}

// Generate plain text email
function generateEmailText(data: ContactFormData): string {
  return `
New ADNYX Enquiry

Contact Details:
Name: ${data.name}
Company: ${data.company}
Email: ${data.email}
${data.phone ? `Phone: ${data.phone}` : ""}
${data.budget ? `Budget: ${data.budget}` : ""}

Message:
${data.message}

---
Sent from ADNYX website contact form
Time: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
  `.trim();
}

// Escape HTML to prevent XSS
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
