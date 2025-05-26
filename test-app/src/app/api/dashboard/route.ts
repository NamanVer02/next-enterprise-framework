import { NextResponse } from "next/server";
import PocketBaseClient from "../../../lib/pocketbase";

export async function GET() {
  try {
    const pb = PocketBaseClient.getInstance();

    // Check if PocketBase is healthy
    const isHealthy = await pb.isHealthy();
    if (!isHealthy) {
      console.warn("PocketBase is not available, returning fallback data");
      return NextResponse.json(
        {
          success: false,
          error: "CMS not available",
          data: null,
        },
        { status: 503 }
      );
    }

    // Fetch only car model data
    const carModel = await pb.getCarModel();

    return NextResponse.json({
      success: true,
      data: {
        carModel,
      },
    });
  } catch (error) {
    console.error("Error fetching car model data:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch car model data",
        data: null,
      },
      { status: 500 }
    );
  }
}
