export type MediaType =
  | "Digital Billboard"
  | "Static Hoarding"
  | "Transit Media"
  | "Gantry";

export type Zone = "North" | "South" | "East" | "West" | "Central";

export type Availability = "Available" | "Booked" | "Coming Soon";

export interface InventoryLocation {
  id: string;
  slug: string;
  name: string;
  area: string;
  zone: Zone;
  type: MediaType;
  format: string;
  widthFt: number;
  heightFt: number;
  resolution?: string;
  illuminated: boolean;
  dailyImpressions?: number;
  landmark: string;
  gps?: string;
  availability: Availability;
  highlights: string[];
  hue: [string, string];
  position: { x: number; y: number };
  hasNightImage?: boolean;
  imageUrl?: string;
  videoUrl?: string;
}
