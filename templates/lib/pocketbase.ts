import PocketBase from 'pocketbase';

// Define types for PocketBase collections
export interface CarModel {
  id: string;
  name: string;
  tagline: string;
  description: string;
  badge_text?: string;
  hero_image?: string;
  created: string;
  updated: string;
}

export interface CarFeature {
  id: string;
  title: string;
  description: string;
  value: string;
  icon: string;
}

export interface CarSpecification {
  id: string;
  label: string;
  value: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  image?: string;
  alt_text?: string;
}

export interface CTASection {
  id: string;
  title: string;
  description: string;
  primary_button_text: string;
  primary_button_link: string;
  secondary_button_text: string;
  secondary_button_link: string;
}

// Helper function to format PocketBase image URLs
export function formatImageUrl(collectionId: string, recordId: string, fileName: string): string {
  if (!fileName) return "";

  // If it's already a valid URL or starts with a slash, return as is
  if (fileName.startsWith("http") || fileName.startsWith("/")) {
    return fileName;
  }

  // For PocketBase images, construct the full URL
  return `http://127.0.0.1:8090/api/files/${collectionId}/${recordId}/${fileName}`;
}

// Create a PocketBase client singleton
let _pocketbaseInstance: PocketBase | null = null;

export function getPocketBase(): PocketBase {
  if (!_pocketbaseInstance) {
    _pocketbaseInstance = new PocketBase('http://127.0.0.1:8090');
  }
  return _pocketbaseInstance;
}

// Server-side data fetching function for car model
export async function getCarModel(): Promise<CarModel | null> {
  try {
    const pb = getPocketBase();
    const carModels = await pb.collection('car_models').getFullList<CarModel>();
    if (carModels.length > 0) {
      return carModels[0];
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch car model:", error);
    return null;
  }
} 