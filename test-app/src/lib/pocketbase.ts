import PocketBase from "pocketbase";

// Types for our car dashboard content
export interface CarModel {
  id: string;
  name: string;
  tagline: string;
  description: string;
  hero_image?: string;
  badge_text?: string;
  created: string;
  updated: string;
}

export interface CarFeature {
  id: string;
  title: string;
  description: string;
  value: string;
  icon: string;
  created: string;
  updated: string;
}

export interface CarSpecification {
  id: string;
  label: string;
  value: string;
  created: string;
  updated: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  image: string;
  alt_text?: string;
  created: string;
  updated: string;
}

export interface CTASection {
  id: string;
  title: string;
  description: string;
  primary_button_text: string;
  primary_button_link: string;
  secondary_button_text: string;
  secondary_button_link: string;
  created: string;
  updated: string;
}

class PocketBaseClient {
  private static instance: PocketBaseClient;
  private pb: PocketBase;
  private baseUrl: string;

  private constructor() {
    this.baseUrl = "http://127.0.0.1:8090";
    this.pb = new PocketBase(this.baseUrl);
  }

  public static getInstance(): PocketBaseClient {
    if (!PocketBaseClient.instance) {
      PocketBaseClient.instance = new PocketBaseClient();
    }
    return PocketBaseClient.instance;
  }

  // Car Models - Modified to work with public records
  async getCarModel(): Promise<CarModel | null> {
    try {
      // Try to get the first car model from the public API
      const response = await fetch(
        `${this.baseUrl}/api/collections/car_models/records?page=1&perPage=1`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch car model: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.items && data.items.length > 0) {
        const carModel = data.items[0];

        // Format hero_image URL if it exists
        if (carModel.hero_image) {
          // PocketBase file format: COLLECTION_ID/RECORD_ID/FILENAME
          carModel.hero_image = `${this.baseUrl}/api/files/${carModel.collectionId}/${carModel.id}/${carModel.hero_image}`;
        }

        return carModel as unknown as CarModel;
      }

      return null;
    } catch (error) {
      console.error("Error fetching car model:", error);
      return null;
    }
  }

  // Car Features
  async getCarFeatures(): Promise<CarFeature[]> {
    try {
      const records = await this.pb.collection("car_features").getFullList({
        sort: "created",
      });
      return records as unknown as CarFeature[];
    } catch (error) {
      console.error("Error fetching car features:", error);
      return [];
    }
  }

  // Car Specifications
  async getCarSpecifications(): Promise<CarSpecification[]> {
    try {
      const records = await this.pb
        .collection("car_specifications")
        .getFullList({
          sort: "created",
        });
      return records as unknown as CarSpecification[];
    } catch (error) {
      console.error("Error fetching car specifications:", error);
      return [];
    }
  }

  // Gallery Images
  async getGalleryImages(): Promise<GalleryImage[]> {
    try {
      const records = await this.pb.collection("gallery_images").getFullList({
        sort: "created",
      });
      return records as unknown as GalleryImage[];
    } catch (error) {
      console.error("Error fetching gallery images:", error);
      return [];
    }
  }

  // CTA Section
  async getCTASection(): Promise<CTASection | null> {
    try {
      const record = await this.pb
        .collection("cta_sections")
        .getFirstListItem("");
      return record as unknown as CTASection;
    } catch (error) {
      console.error("Error fetching CTA section:", error);
      return null;
    }
  }

  // Helper method to get file URL
  getFileUrl(collectionId: string, recordId: string, filename: string): string {
    return `${this.baseUrl}/api/files/${collectionId}/${recordId}/${filename}`;
  }

  // Health check
  async isHealthy(): Promise<boolean> {
    try {
      // Use the health endpoint which doesn't require authentication
      const response = await fetch(`${this.baseUrl}/api/health`);
      return response.ok;
    } catch (error) {
      console.error("PocketBase health check failed:", error);
      return false;
    }
  }
}

export default PocketBaseClient;
