export type AssetKind = "image" | "video" | "other";

export interface MediaItem {
  id: string;
  url: string;
  pathname: string;
  contentType: string | null;
  kind: AssetKind;
  label: string;
  sizeBytes: number | null;
  createdAt: string;
}
