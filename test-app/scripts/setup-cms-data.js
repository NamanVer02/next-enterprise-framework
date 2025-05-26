const PocketBase = require("pocketbase");

const pb = new PocketBase("http://127.0.0.1:8090");

async function setupCollections() {
  try {
    console.log("🚀 Starting CMS data setup...\n");

    // Create collections (these will be created manually in PocketBase admin)
    console.log(
      "📋 Please ensure the following collections exist in PocketBase:"
    );
    console.log(
      "1. car_models (name:text, tagline:text, description:text, hero_image:file, badge_text:text)"
    );
    console.log(
      "2. car_features (title:text, description:text, value:text, icon:text)"
    );
    console.log("3. car_specifications (label:text, value:text)");
    console.log("4. gallery_images (title:text, image:file, alt_text:text)");
    console.log(
      "5. cta_sections (title:text, description:text, primary_button_text:text, primary_button_link:text, secondary_button_text:text, secondary_button_link:text)\n"
    );

    // Sample data for car model
    const carModelData = {
      name: "Tesla Model S Plaid",
      tagline: "The quickest accelerating sedan ever built. Beyond Ludicrous.",
      description:
        "Experience the future of automotive engineering with cutting-edge technology",
      badge_text: "New Launch 2024",
    };

    // Sample data for car features
    const carFeaturesData = [
      {
        title: "Electric Performance",
        description: "0-60 mph in 3.2 seconds with instant torque delivery",
        icon: "⚡",
        value: "3.2s",
      },
      {
        title: "Range",
        description: "Up to 400 miles on a single charge",
        icon: "🔋",
        value: "400mi",
      },
      {
        title: "Charging Speed",
        description: "10-80% charge in just 18 minutes",
        icon: "⚡",
        value: "18min",
      },
      {
        title: "Top Speed",
        description: "Maximum speed of 180 mph",
        icon: "🏎️",
        value: "180mph",
      },
    ];

    // Sample data for specifications
    const specificationsData = [
      { label: "Motor", value: "Dual Motor AWD" },
      { label: "Power", value: "670 HP" },
      { label: "Torque", value: "650 lb-ft" },
      { label: "Battery", value: "100 kWh" },
      { label: "Drivetrain", value: "All-Wheel Drive" },
      { label: "Seating", value: "5 Adults" },
    ];

    // Sample data for gallery
    const galleryData = [
      { title: "Front View", alt_text: "Tesla Model S Plaid front view" },
      { title: "Side View", alt_text: "Tesla Model S Plaid side profile" },
      { title: "Interior", alt_text: "Tesla Model S Plaid interior dashboard" },
      { title: "Rear View", alt_text: "Tesla Model S Plaid rear view" },
    ];

    // Sample data for CTA section
    const ctaData = {
      title: "Ready to Experience the Future?",
      description:
        "Join the electric revolution and be part of sustainable mobility",
      primary_button_text: "Order Now",
      primary_button_link: "/order",
      secondary_button_text: "Learn More",
      secondary_button_link: "/learn-more",
    };

    // Insert data (these operations will only work if collections exist)
    try {
      console.log("📝 Attempting to insert sample data...\n");

      // Insert car model
      try {
        const carModel = await pb.collection("car_models").create(carModelData);
        console.log("✅ Car model created:", carModel.id);
      } catch (error) {
        console.log("ℹ️ Car model collection not found or data already exists");
      }

      // Insert car features
      for (const feature of carFeaturesData) {
        try {
          const featureRecord = await pb
            .collection("car_features")
            .create(feature);
          console.log("✅ Car feature created:", feature.title);
        } catch (error) {
          console.log(
            "ℹ️ Car features collection not found or data already exists"
          );
          break;
        }
      }

      // Insert specifications
      for (const spec of specificationsData) {
        try {
          const specRecord = await pb
            .collection("car_specifications")
            .create(spec);
          console.log("✅ Specification created:", spec.label);
        } catch (error) {
          console.log(
            "ℹ️ Specifications collection not found or data already exists"
          );
          break;
        }
      }

      // Insert gallery items
      for (const gallery of galleryData) {
        try {
          const galleryRecord = await pb
            .collection("gallery_images")
            .create(gallery);
          console.log("✅ Gallery item created:", gallery.title);
        } catch (error) {
          console.log("ℹ️ Gallery collection not found or data already exists");
          break;
        }
      }

      // Insert CTA section
      try {
        const ctaRecord = await pb.collection("cta_sections").create(ctaData);
        console.log("✅ CTA section created:", ctaRecord.id);
      } catch (error) {
        console.log("ℹ️ CTA collection not found or data already exists");
      }

      console.log("\n🎉 Sample data setup completed!");
      console.log(
        "📖 Visit http://127.0.0.1:8090/_/ to manage your content in PocketBase admin"
      );
      console.log(
        "🌐 Visit http://localhost:3000/dashboard to see your dashboard"
      );
    } catch (error) {
      console.log("\n⚠️ Could not insert data. Please:");
      console.log("1. Ensure PocketBase is running (http://127.0.0.1:8090)");
      console.log("2. Create the collections manually in PocketBase admin");
      console.log("3. Run this script again");
    }
  } catch (error) {
    console.error("❌ Error during setup:", error.message);
    console.log("\n📋 Manual Setup Instructions:");
    console.log(
      "1. Start PocketBase: cd pocketbase-server && ./pocketbase serve --dev"
    );
    console.log("2. Visit http://127.0.0.1:8090/_/ to access admin");
    console.log("3. Create the collections mentioned above");
    console.log("4. Add sample data manually or run this script again");
  }
}

// Instructions for running this script
console.log("🚗 Car Dashboard CMS Setup");
console.log("========================\n");

// Check if PocketBase is available
async function checkPocketBase() {
  try {
    await pb.health.check();
    console.log("✅ PocketBase is running\n");
    await setupCollections();
  } catch (error) {
    console.log("❌ PocketBase is not running or not accessible");
    console.log("📋 Please start PocketBase first:");
    console.log("   cd pocketbase-server && ./pocketbase serve --dev\n");
    console.log("Then run this script again: node scripts/setup-cms-data.js");
  }
}

checkPocketBase();
