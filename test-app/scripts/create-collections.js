const PocketBase = require("pocketbase").default || require("pocketbase");

const pb = new PocketBase("http://127.0.0.1:8090");

async function createCollections() {
  try {
    console.log("🚀 Creating PocketBase collections for Car Dashboard...\n");

    // Collection schemas
    const collections = [
      {
        name: "car_models",
        schema: [
          { name: "name", type: "text", required: true },
          { name: "tagline", type: "text", required: true },
          { name: "description", type: "text", required: true },
          { name: "hero_image", type: "file", required: false },
          { name: "badge_text", type: "text", required: false },
        ],
      },
      {
        name: "car_features",
        schema: [
          { name: "title", type: "text", required: true },
          { name: "description", type: "text", required: true },
          { name: "value", type: "text", required: true },
          { name: "icon", type: "text", required: true },
        ],
      },
      {
        name: "car_specifications",
        schema: [
          { name: "label", type: "text", required: true },
          { name: "value", type: "text", required: true },
        ],
      },
      {
        name: "gallery_images",
        schema: [
          { name: "title", type: "text", required: true },
          { name: "image", type: "file", required: false },
          { name: "alt_text", type: "text", required: false },
        ],
      },
      {
        name: "cta_sections",
        schema: [
          { name: "title", type: "text", required: true },
          { name: "description", type: "text", required: true },
          { name: "primary_button_text", type: "text", required: true },
          { name: "primary_button_link", type: "text", required: true },
          { name: "secondary_button_text", type: "text", required: true },
          { name: "secondary_button_link", type: "text", required: true },
        ],
      },
    ];

    // Try to create collections
    for (const collectionData of collections) {
      try {
        await pb.collections.create({
          name: collectionData.name,
          type: "base",
          schema: collectionData.schema.map((field) => ({
            name: field.name,
            type: field.type,
            required: field.required,
            options:
              field.type === "file" ? { maxSelect: 1, maxSize: 5242880 } : {},
          })),
        });
        console.log(`✅ Created collection: ${collectionData.name}`);
      } catch (error) {
        if (error.message?.includes("already exists")) {
          console.log(`ℹ️ Collection already exists: ${collectionData.name}`);
        } else {
          console.log(
            `❌ Error creating ${collectionData.name}:`,
            error.message
          );
        }
      }
    }

    console.log("\n📝 Inserting sample data...\n");

    // Sample data
    const sampleData = {
      carModel: {
        name: "Tesla Model S Plaid",
        tagline:
          "The quickest accelerating sedan ever built. Beyond Ludicrous.",
        description:
          "Experience the future of automotive engineering with cutting-edge technology",
        badge_text: "New Launch 2024",
      },
      carFeatures: [
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
      ],
      carSpecifications: [
        { label: "Motor", value: "Dual Motor AWD" },
        { label: "Power", value: "670 HP" },
        { label: "Torque", value: "650 lb-ft" },
        { label: "Battery", value: "100 kWh" },
        { label: "Drivetrain", value: "All-Wheel Drive" },
        { label: "Seating", value: "5 Adults" },
      ],
      galleryImages: [
        { title: "Front View", alt_text: "Tesla Model S Plaid front view" },
        { title: "Side View", alt_text: "Tesla Model S Plaid side profile" },
        {
          title: "Interior",
          alt_text: "Tesla Model S Plaid interior dashboard",
        },
        { title: "Rear View", alt_text: "Tesla Model S Plaid rear view" },
      ],
      ctaSection: {
        title: "Ready to Experience the Future?",
        description:
          "Join the electric revolution and be part of sustainable mobility",
        primary_button_text: "Order Now",
        primary_button_link: "/order",
        secondary_button_text: "Learn More",
        secondary_button_link: "/learn-more",
      },
    };

    // Insert car model
    try {
      const carModel = await pb
        .collection("car_models")
        .create(sampleData.carModel);
      console.log("✅ Car model created:", carModel.id);
    } catch (error) {
      console.log("ℹ️ Car model already exists or error:", error.message);
    }

    // Insert car features
    for (const feature of sampleData.carFeatures) {
      try {
        const record = await pb.collection("car_features").create(feature);
        console.log("✅ Car feature created:", feature.title);
      } catch (error) {
        console.log(
          `ℹ️ Feature "${feature.title}" already exists or error:`,
          error.message
        );
      }
    }

    // Insert car specifications
    for (const spec of sampleData.carSpecifications) {
      try {
        const record = await pb.collection("car_specifications").create(spec);
        console.log("✅ Specification created:", spec.label);
      } catch (error) {
        console.log(
          `ℹ️ Specification "${spec.label}" already exists or error:`,
          error.message
        );
      }
    }

    // Insert gallery images
    for (const gallery of sampleData.galleryImages) {
      try {
        const record = await pb.collection("gallery_images").create(gallery);
        console.log("✅ Gallery item created:", gallery.title);
      } catch (error) {
        console.log(
          `ℹ️ Gallery "${gallery.title}" already exists or error:`,
          error.message
        );
      }
    }

    // Insert CTA section
    try {
      const cta = await pb
        .collection("cta_sections")
        .create(sampleData.ctaSection);
      console.log("✅ CTA section created:", cta.id);
    } catch (error) {
      console.log("ℹ️ CTA section already exists or error:", error.message);
    }

    console.log("\n🎉 Setup completed successfully!");
    console.log("📖 Visit http://127.0.0.1:8090/_/ to view your collections");
    console.log(
      "🌐 Visit http://localhost:3000/dashboard to see your dashboard with CMS data"
    );
  } catch (error) {
    console.error("❌ Setup failed:", error);
    console.log("\nTry running PocketBase manually:");
    console.log("cd ../pocketbase-server && ./pocketbase serve --dev");
  }
}

// Run the setup
console.log("🚗 Car Dashboard - PocketBase Setup");
console.log("===================================\n");

createCollections();
