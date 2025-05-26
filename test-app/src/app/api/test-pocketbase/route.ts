import { NextResponse } from "next/server";
import PocketBaseClient from "../../../lib/pocketbase";

export async function GET() {
  try {
    const pb = PocketBaseClient.getInstance();

    // Check if PocketBase is healthy
    const isHealthy = await pb.isHealthy();

    if (!isHealthy) {
      return NextResponse.json(
        {
          status: "error",
          message: "PocketBase is not running or not accessible",
          pocketbaseUrl: "http://127.0.0.1:8090",
          adminUrl: "http://127.0.0.1:8090/_/",
        },
        { status: 503 }
      );
    }

    // Check car_models data
    let carModelData = null;
    let hasCarModel = false;
    try {
      carModelData = await pb.getCarModel();
      hasCarModel = !!carModelData;
    } catch (error) {
      hasCarModel = false;
    }

    return NextResponse.json({
      status: "success",
      pocketbaseHealthy: true,
      pocketbaseUrl: "http://127.0.0.1:8090",
      adminUrl: "http://127.0.0.1:8090/_/",
      carModel: {
        exists: hasCarModel,
        data: carModelData,
      },
      message: hasCarModel
        ? "Car model data found in PocketBase!"
        : "No car model data found",
      instructions: hasCarModel
        ? [
            "Your dashboard hero section will now show data from PocketBase!",
            "Edit the car model in PocketBase admin to see changes on your dashboard.",
            "Visit your dashboard at http://localhost:3000/dashboard",
          ]
        : [
            "Create a car_models collection with fields: name, tagline, description, hero_image, badge_text",
            "Add a record to the car_models table",
            "Your dashboard will then show the CMS data in the hero section",
          ],
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to connect to PocketBase",
        error: error instanceof Error ? error.message : "Unknown error",
        pocketbaseUrl: "http://127.0.0.1:8090",
        adminUrl: "http://127.0.0.1:8090/_/",
        instructions: [
          "Make sure PocketBase is running: cd pocketbase-server && ./pocketbase serve --dev",
          "Check if you can access the admin interface at the URL above",
        ],
      },
      { status: 500 }
    );
  }
}
