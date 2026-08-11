// Shared between server (bucket admin, signed URLs) and client (direct
// upload) code, so it isn't a secret — just the bucket name.
export const STORAGE_BUCKET = "media";
