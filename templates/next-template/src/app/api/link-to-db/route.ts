// @ts-ignore
import { NextResponse } from "next/server";

// Hardcoded data from page.tsx
const features = [
  {
    title: "Tri-Motor Powertrain",
    description:
      "Revolutionary tri-motor configuration delivering 1,200 horsepower with instant torque distribution to all four wheels.",
  },
  {
    title: "Autonomous Driving Level 4",
    description:
      "Advanced AI-powered self-driving system with 12 cameras, LiDAR, and radar sensors for complete autonomy.",
  },
  {
    title: "Adaptive Interior",
    description:
      "Premium cabin with sustainable materials, 22-speaker sound system, and ambient lighting that adapts to driving conditions.",
  },
  {
    title: "Active Aerodynamics",
    description:
      "Intelligent aerodynamic elements that adjust in real-time for optimal performance and efficiency.",
  },
  {
    title: "Ultra-Fast Charging",
    description:
      "800V architecture enables 10-80% charging in just 18 minutes with our Apex Supercharger network.",
  },
  {
    title: "5-Star Safety",
    description:
      "Industry-leading safety with carbon fiber crumple zones and predictive collision avoidance.",
  },
];

const specifications = [
  {
    label: "Top Speed",
    value: "200 mph",
    description: "Electronically limited",
  },
  { label: "Range", value: "516 miles", description: "EPA estimated" },
  {
    label: "Acceleration",
    value: "0-60 in 2.1s",
    description: "With launch control",
  },
  { label: "Autopilot", value: "Level 4", description: "Full Self-Driving" },
];

const pricingPackages = [
  {
    name: "Aurora GT-S Base",
    price: "$129,900",
    description: "The essential Aurora GT-S experience",
    features: [
      "Dual-Motor AWD (800 HP)",
      "450-mile range",
      "17-inch touchscreen",
      "Premium audio system",
      "Glass panoramic roof",
      "Autopilot included",
      "Over-the-air updates",
      "8-year battery warranty",
    ],
  },
  {
    name: "Aurora GT-S Performance",
    price: "$149,900",
    description: "Maximum performance configuration",
    features: [
      "Tri-Motor AWD (1,200 HP)",
      "516-mile range",
      "Carbon fiber package",
      "Track mode",
      "Performance brakes",
      "Adaptive suspension",
      "Sport seats",
      "Enhanced autopilot",
    ],
    popular: true,
  },
  {
    name: "Aurora GT-S First Edition",
    price: "$189,900",
    description: "Limited production luxury variant",
    features: [
      "All Performance features",
      "Exclusive paint options",
      "22-speaker premium audio",
      "Massaging seats",
      "Full self-driving capability",
      "Exclusive interior materials",
      "Numbered badge",
      "Concierge service",
    ],
  },
];

const companyStats = [
  { number: "25+", label: "Industry Awards", description: "2024 recognition" },
  { number: "500K+", label: "Pre-Orders", description: "Global demand" },
  { number: "50+", label: "Countries", description: "Worldwide launch" },
  { number: "12", label: "Manufacturing", description: "Global facilities" },
];

const testimonials = [
  {
    name: "James Morrison",
    role: "Automotive Journalist, Motor Trend",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    quote:
      "The Aurora GT-S doesn&apos;t just redefine electric performance—it obliterates every preconception about what an EV can be. This is automotive nirvana.",
  },
  {
    name: "Dr. Sarah Chen",
    role: "Technology Executive, Former Tesla",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    quote:
      "After two decades in automotive technology, the Aurora GT-S represents the single greatest leap forward I&apos;ve witnessed. The integration is flawless.",
  },
  {
    name: "Michael Rodriguez",
    role: "Professional Racing Driver, Formula E",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    quote:
      "In 15 years of professional racing, nothing has prepared me for the Aurora GT-S. The precision, the power, the control—it&apos;s in a league of its own.",
  },
];

const galleryImages = [
  {
    url: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Exterior Design",
    description: "Aerodynamic perfection",
  },
  {
    url: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Interior Luxury",
    description: "Premium materials and craftsmanship",
  },
  {
    url: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Performance Mode",
    description: "Track-ready configuration",
  },
  {
    url: "https://images.unsplash.com/photo-1493238792000-8113da705763?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Charging Technology",
    description: "Ultra-fast charging capability",
  },
];

const STRAPI_URL = "http://localhost:1337";

async function getSuperAdminJWT() {
  const email = process.env.STRAPI_SUPERADMIN_EMAIL;
  const password = process.env.STRAPI_SUPERADMIN_PASSWORD;
  if (!email || !password) {
    return {
      error:
        "Missing STRAPI_SUPERADMIN_EMAIL or STRAPI_SUPERADMIN_PASSWORD environment variables.",
    };
  }
  try {
    const res = await fetch(`${STRAPI_URL}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (!res.ok) {
      return { error: "Failed to login as superadmin. Check credentials." };
    }
    const data = await res.json();
    return { jwt: data.data.token };
  } catch (e) {
    return { error: "Error connecting to Strapi admin login." };
  }
}

async function isSuperAdmin(jwt) {
  try {
    const res = await fetch(`${STRAPI_URL}/admin/users/me`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    if (!res.ok) return false;
    const data = await res.json();
    return (
      data.data &&
      data.data.roles &&
      data.data.roles.some((r) => r.code === "strapi-super-admin")
    );
  } catch (e) {
    return false;
  }
}

// Helper to wait for a collection type to become available
async function waitForCollection(jwt, plural, maxWaitMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < maxWaitMs) {
    try {
      const res = await fetch(`${STRAPI_URL}/api/${plural}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      // Treat 200 (OK) and 401 (Unauthorized) as 'collection exists'
      if (res.status === 200 || res.status === 401) return true;
    } catch (e) {}
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
  return false;
}

// Helper to create a collection type if it doesn't exist
async function ensureCollectionType(
  jwt,
  { singular, plural, displayName, description, attributes }
) {
  console.log(`[link-to-db] Checking/creating collection: ${plural}`);
  // Check if the collection type exists
  try {
    const res = await fetch(`${STRAPI_URL}/api/${plural}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    if (res.status === 200) {
      console.log(`[link-to-db] Collection '${plural}' already exists.`);
      return true;
    }
  } catch (e) {}
  // If not, create it
  try {
    const payload = {
      contentType: {
        displayName,
        singularName: singular,
        pluralName: plural,
        description,
        draftAndPublish: true,
        attributes,
      },
    };
    const res = await fetch(
      `${STRAPI_URL}/content-type-builder/content-types`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(payload),
      }
    );
    if (res.ok) {
      console.log(
        `[link-to-db] Created collection '${plural}', waiting for Strapi to reload...`
      );
      // Wait for Strapi to reload and the new collection to become available
      const available = await waitForCollection(jwt, plural);
      if (!available) {
        console.error(
          `[link-to-db] Timeout waiting for collection ${plural} to become available after creation.`
        );
        return false;
      }
      return true;
    } else {
      const err = await res.text();
      console.error(
        `[link-to-db] Failed to create collection type ${plural}:`,
        err
      );
      return false;
    }
  } catch (e) {
    console.error(
      `[link-to-db] Exception creating collection type ${plural}:`,
      e
    );
    return false;
  }
}

// Helper to enable 'find', 'findOne', and 'create' permissions for a collection for the Public role
async function enablePublicCrudPermissions(jwt: string, singular: string) {
  console.log(`[link-to-db] Enabling public CRUD permissions for: ${singular}`);
  const roleRes = await fetch(`${STRAPI_URL}/users-permissions/roles/2`, {
    headers: { Authorization: `Bearer ${jwt}` },
  });
  if (!roleRes.ok) {
    console.error(`[link-to-db] Failed to fetch public role for: ${singular}`);
    return false;
  }
  const roleData = await roleRes.json();
  const currentPermissions =
    roleData.permissions || (roleData.role && roleData.role.permissions) || {};
  const update = { permissions: { ...currentPermissions } };
  // Use singular model name for key and controller
  const key = `api::${singular}`;
  update.permissions[key] = update.permissions[key] || {};
  update.permissions[key].controllers =
    update.permissions[key].controllers || {};
  update.permissions[key].controllers[singular] = {
    find: { enabled: true },
    findOne: { enabled: true },
    create: { enabled: true },
  };
  console.log(
    `[link-to-db][PERMISSIONS][FIXED] Updated permissions payload for PUT:`,
    JSON.stringify(update, null, 2)
  );
  const putRes = await fetch(`${STRAPI_URL}/users-permissions/roles/2`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(update),
  });
  const putText = await putRes.text();
  if (!putRes.ok) {
    console.error(
      `[link-to-db] Failed to enable public permissions for ${singular}:`,
      putText
    );
    return false;
  }
  console.log(
    `[link-to-db][PERMISSIONS] PUT response for ${singular}:`,
    putText
  );
  return true;
}

// Helper to create entries as Public (unauthenticated)
async function createEntriesPublic(plural: any, entries: any[]) {
  console.log(`[link-to-db] Seeding data for collection (public): ${plural}`);
  let created = 0;
  for (const entry of entries) {
    // Check if already exists (by unique field)
    let query = "";
    if (entry.name)
      query = `?filters[name][$eq]=${encodeURIComponent(entry.name)}`;
    else if (entry.title)
      query = `?filters[title][$eq]=${encodeURIComponent(entry.title)}`;
    else if (entry.label)
      query = `?filters[label][$eq]=${encodeURIComponent(entry.label)}`;
    else if (entry.number)
      query = `?filters[number][$eq]=${encodeURIComponent(entry.number)}`;
    else if (entry.url)
      query = `?filters[url][$eq]=${encodeURIComponent(entry.url)}`;
    const existing = await fetch(`${STRAPI_URL}/api/${plural}${query}`);
    if (existing.ok) {
      const data = await existing.json();
      if (data.data && data.data.length > 0) {
        continue;
      }
    }
    const postUrl = `${STRAPI_URL}/api/${plural}`;
    const postHeaders = { "Content-Type": "application/json" };
    const postBody = JSON.stringify({ data: entry });
    let attempts = 0;
    let success = false;
    while (attempts < 3 && !success) {
      console.log(`[link-to-db][SEED] POST as Public to ${postUrl}`);
      console.log(`[link-to-db][SEED] Headers:`, JSON.stringify(postHeaders));
      console.log(`[link-to-db][SEED] Body:`, postBody);
      const res = await fetch(postUrl, {
        method: "POST",
        headers: postHeaders,
        body: postBody,
      });
      const resText = await res.text();
      if (res.ok) {
        created++;
        success = true;
        console.log(`[link-to-db][SEED] Success:`, resText);
      } else if (res.status === 403) {
        attempts++;
        if (attempts < 3) {
          console.warn(
            `[link-to-db][SEED] 403 Forbidden, retrying in 2s... (attempt ${
              attempts + 1
            }/3)`
          );
          await new Promise((resolve) => setTimeout(resolve, 2000));
        } else {
          console.error(
            `[link-to-db][SEED] Failed to create entry in ${plural} (public) after 3 attempts:`,
            resText
          );
        }
      } else {
        console.error(
          `[link-to-db][SEED] Failed to create entry in ${plural} (public):`,
          resText
        );
        break;
      }
    }
  }
  return created;
}

const collections: any[] = [
  {
    singular: "feature",
    plural: "features",
    displayName: "Feature",
    description: "Car features",
    attributes: {
      title: { type: "string", required: true },
      description: { type: "string" },
    },
    entries: features,
  },
  {
    singular: "specification",
    plural: "specifications",
    displayName: "Specification",
    description: "Car specifications",
    attributes: {
      label: { type: "string", required: true },
      value: { type: "string" },
      description: { type: "string" },
    },
    entries: specifications,
  },
  {
    singular: "car",
    plural: "cars",
    displayName: "Car",
    description: "Car pricing packages",
    attributes: {
      name: { type: "string", required: true },
      price: { type: "string", required: true },
      description: { type: "string" },
      features: { type: "json" },
      popular: { type: "boolean" },
    },
    entries: pricingPackages,
  },
  {
    singular: "companystat",
    plural: "companystats",
    displayName: "CompanyStat",
    description: "Company stats",
    attributes: {
      number: { type: "string", required: true },
      label: { type: "string" },
      description: { type: "string" },
    },
    entries: companyStats,
  },
  {
    singular: "testimonial",
    plural: "testimonials",
    displayName: "Testimonial",
    description: "Testimonials",
    attributes: {
      name: { type: "string", required: true },
      role: { type: "string" },
      image: { type: "string" },
      quote: { type: "string" },
    },
    entries: testimonials,
  },
  {
    singular: "galleryimage",
    plural: "galleryimages",
    displayName: "GalleryImage",
    description: "Gallery images",
    attributes: {
      url: { type: "string", required: true },
      title: { type: "string" },
      description: { type: "string" },
    },
    entries: galleryImages,
  },
];

export async function POST() {
  console.log("[link-to-db] Starting DB integration (car collection only)...");
  const { jwt, error } = await getSuperAdminJWT();
  if (error) {
    console.error("[link-to-db] Super admin JWT error:", error);
    return NextResponse.json({ message: error, success: false });
  }
  const isSuper = await isSuperAdmin(jwt);
  if (!isSuper) {
    console.error("[link-to-db] Not a super admin!");
    return NextResponse.json({
      message: "Authenticated user is not a Super Admin.",
      success: false,
    });
  }

  // Only work with the 'car' collection
  const carCol = collections.find((col) => col.singular === "car");
  if (!carCol) {
    console.error(
      "[link-to-db] 'car' collection definition not found in template."
    );
    return NextResponse.json({
      message: "Car collection not found.",
      success: false,
    });
  }

  // 1. Create the car collection
  console.log(
    `[link-to-db][CAR] Creating/checking collection: ${carCol.plural}`
  );
  const createdType = await ensureCollectionType(jwt, carCol);
  if (createdType) {
    console.log(`✅ [CAR] Collection '${carCol.plural}' created/exists.`);
  } else {
    console.error(
      `❌ [CAR] Failed to create/access collection: ${carCol.plural}`
    );
    return NextResponse.json({
      message: `Failed to create/access car collection.`,
      success: false,
    });
  }

  // Wait for Strapi to reload the new collection
  console.log(
    "[link-to-db][CAR] Waiting for Strapi to reload collection (5s)..."
  );
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // 2. Enable public CRUD permissions for car
  console.log(
    `[link-to-db][CAR] Enabling public CRUD permissions for: ${carCol.singular}`
  );
  const enabled = await enablePublicCrudPermissions(jwt, carCol.singular);
  if (enabled) {
    console.log(
      `✅ [CAR] Public 'find'/'findOne'/'create' permissions enabled for: ${carCol.plural}`
    );
  } else {
    console.error(
      `❌ [CAR] Failed to enable public permissions for: ${carCol.plural}`
    );
    return NextResponse.json({
      message: `Failed to enable public permissions for car.`,
      success: false,
    });
  }

  // Wait for Strapi to reload permissions
  console.log(
    "[link-to-db][CAR] Waiting for Strapi to reload permissions (10s)..."
  );
  await new Promise((resolve) => setTimeout(resolve, 10000));

  // 3. Seed data for car collection as Public (unauthenticated)
  console.log(
    `[link-to-db][CAR] Seeding data for collection (public): ${carCol.plural}`
  );
  const createdEntries = await createEntriesPublic(
    carCol.plural,
    carCol.entries
  );
  if (createdEntries > 0) {
    console.log(
      `✅ [CAR] Collection '${carCol.plural}': ${createdEntries} entries created.`
    );
  } else {
    console.warn(`⚠️  [CAR] No new entries created for: ${carCol.plural}`);
  }

  console.log("[link-to-db][CAR] DB integration complete!");
  return NextResponse.json({
    message: "DB integration complete! (car collection only)",
    success: true,
  });
}
