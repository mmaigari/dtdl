export interface ProjectAmenity {
  icon: string;
  label: string;
}

export interface Project {
  slug: string;
  title: string;
  location: string;
  type: "residential" | "commercial" | "mixed-use";
  status: "completed" | "ongoing" | "upcoming";
  units: number;
  description: string;
  longDescription: string;
  heroImage: string;
  cardImage: string;
  galleryImages: string[];
  amenities: ProjectAmenity[];
  featured: boolean;
  houseTypes?: string[];
  yearLaunched?: number;
}

export const projects: Project[] = [
  {
    slug: "dantata-housing-estate",
    title: "Dantata Housing Estate",
    location: "Kubwa Arab Road, Abuja",
    type: "residential",
    status: "completed",
    units: 1299,
    yearLaunched: 2012,
    description:
      "A large-scale residential estate featuring 1,299 units across multiple house types, designed with a community-focused approach that fosters a sense of belonging among residents.",
    longDescription:
      "Dantata Housing Estate, located at Kubwa Arab Road, Abuja, is one of DTDL's flagship developments and a cornerstone of our portfolio. The estate features a diverse range of housing options including 4-bedroom duplexes, 5-bedroom duplexes, 3-bedroom terraces, 4-bedroom terraces, 3-bedroom bungalows, 3-bedroom semi-detached bungalows, 2-bedroom semi-detached bungalows, and 2-bedroom apartment blocks — totaling 1,299 units. The development is characterized by spacious living arrangements, quality construction, and a community-focused approach that fosters a genuine sense of belonging among residents. Complete infrastructure including roads, drainage, electrification, and water reticulation ensures a comfortable and functional living environment.",
    heroImage: "/dhe1.png",
    cardImage: "/dhe1.png",
    galleryImages: [
      "/dhe1.png",
      "/dhe2.png",
      "/dhe3.png",
    ],
    houseTypes: [
      "4-Bedroom Duplexes",
      "5-Bedroom Duplexes",
      "3-Bedroom Terraces",
      "4-Bedroom Terraces",
      "3-Bedroom Bungalows",
      "3-Bedroom Semi-Detached Bungalows",
      "2-Bedroom Semi-Detached Bungalows",
      "2-Bedroom Apartment Blocks",
    ],
    amenities: [
      { icon: "ShoppingBag", label: "Shopping Mall" },
      { icon: "Building", label: "Mosque" },
      { icon: "Baby", label: "Children's Playground" },
      { icon: "GraduationCap", label: "School" },
    ],
    featured: true,
  },
  {
    slug: "the-district-by-dantata",
    title: "The District by Dantata",
    location: "Gwarinpa, Abuja",
    type: "residential",
    status: "completed",
    units: 804,
    yearLaunched: 2015,
    description:
      "A vibrant 804-unit estate in Gwarinpa featuring diverse housing types from apartments to penthouses, with family-friendly designs and community spaces.",
    longDescription:
      "The District by Dantata, located in the sought-after Gwarinpa area of Abuja, offers a diverse range of housing types including 1, 2, and 3-bedroom apartments, 3-bedroom terraces, 4-bedroom terraces, 5-bedroom duplexes, 6-bedroom duplexes, and 3-bedroom penthouses — totaling 804 units. The key features of this estate focus on family-friendly designs that incorporate community spaces and provide easy access to local services, fostering a vibrant neighborhood atmosphere. The development is designed to create a thriving community where residents enjoy modern amenities, secure environments, and spaces that promote well-being.",
    heroImage: "/distr1.png",
    cardImage: "/distr1.png",
    galleryImages: [
      "/distr1.png",
      "/distr2.png",
      "/distr3.png",
      "/distr4.png",
    ],
    houseTypes: [
      "1-Bedroom Apartments",
      "2-Bedroom Apartments",
      "3-Bedroom Apartments",
      "3-Bedroom Terraces",
      "4-Bedroom Terraces",
      "5-Bedroom Duplexes",
      "6-Bedroom Duplexes",
      "3-Bedroom Penthouses",
    ],
    amenities: [
      { icon: "ShoppingBag", label: "Shopping Mall" },
      { icon: "Building", label: "Mosque & Church" },
      { icon: "Coffee", label: "Relaxation Centre" },
      { icon: "Heart", label: "Hospital" },
      { icon: "GraduationCap", label: "School" },
    ],
    featured: true,
  },
  {
    slug: "mabushi-luxury-terraces",
    title: "Mabushi Luxury Terraces",
    location: "Mabushi, Abuja",
    type: "residential",
    status: "completed",
    units: 10,
    yearLaunched: 2012,
    description:
      "An exclusive collection of 10 luxury terrace units in Mabushi, Abuja, designed with premium finishes and modern amenities for an unparalleled upscale living experience.",
    longDescription:
      "Mabushi Luxury Terraces introduces an exclusive collection of 10 luxury units located at Mabushi, Abuja, each designed to offer an unparalleled living experience. These premium residences boast spacious interiors adorned with high-end finishes, complemented by modern amenities that cater to an upscale lifestyle. As one of DTDL's earliest developments, Mabushi Luxury Terraces set the benchmark for the quality and attention to detail that has become synonymous with the Dantata Town Developers brand.",
    heroImage: "https://placehold.co/1920x1080",
    cardImage: "https://placehold.co/800x600",
    galleryImages: [
      "https://placehold.co/1920x1080",
      "https://placehold.co/1920x1080",
      "https://placehold.co/1920x1080",
      "https://placehold.co/1920x1080",
    ],
    houseTypes: ["Luxury Terrace Units"],
    amenities: [
      { icon: "Shield", label: "24/7 Security" },
      { icon: "Zap", label: "Reliable Power Supply" },
      { icon: "Droplet", label: "Water Supply" },
      { icon: "Route", label: "Quality Road Network" },
    ],
    featured: false,
  },
  {
    slug: "dantata-garden",
    title: "Dantata Garden",
    location: "Karsana, Abuja",
    type: "residential",
    status: "completed",
    units: 624,
    yearLaunched: 2018,
    description:
      "A 624-unit residential community at Karsana with extensive green spaces, playgrounds, and secure environments designed for family-focused living.",
    longDescription:
      "Dantata Garden, located at Karsana, Abuja, offers a variety of house types including 1, 2, and 3-bedroom apartments, 4-bedroom terrace homes, 4-bedroom semi-detached houses, and 5-bedroom duplexes — totaling 624 units. Designed to foster a vibrant community atmosphere, the development features extensive green spaces and playgrounds for children. The secure environments prioritize the safety and well-being of residents, ensuring a peaceful living experience. Dantata Garden represents DTDL's commitment to creating residential communities that balance modern living with nature.",
    heroImage: "https://placehold.co/1920x1080",
    cardImage: "https://placehold.co/800x600",
    galleryImages: [
      "https://placehold.co/1920x1080",
      "https://placehold.co/1920x1080",
      "https://placehold.co/1920x1080",
      "https://placehold.co/1920x1080",
    ],
    houseTypes: [
      "1-Bedroom Apartments",
      "2-Bedroom Apartments",
      "3-Bedroom Apartments",
      "4-Bedroom Terrace Homes",
      "4-Bedroom Semi-Detached Houses",
      "5-Bedroom Duplexes",
    ],
    amenities: [
      { icon: "ShoppingBag", label: "Shopping Complex" },
      { icon: "Building", label: "Mosque" },
      { icon: "TreePine", label: "Recreational Park" },
      { icon: "GraduationCap", label: "School" },
    ],
    featured: false,
  },
  {
    slug: "dantata-city",
    title: "Dantata City",
    location: "FO1 Kubwa, Abuja",
    type: "residential",
    status: "ongoing",
    units: 1497,
    yearLaunched: 2024,
    description:
      "A landmark two-phase development at FO1 Kubwa with 1,497 units, featuring innovative architectural designs, energy-efficient systems, and state-of-the-art security.",
    longDescription:
      "Dantata City, located at FO1 Kubwa, Abuja, is one of DTDL's most ambitious developments. The project offers a diverse range of housing options including 1, 2, and 3-bedroom apartment blocks, 3-bedroom terrace houses, 4-bedroom terrace houses, 4-bedroom semi-detached homes, and 5-bedroom terrace houses. Phase 1 comprises 410 units while Phase 2 features an impressive 1,087 units, bringing the total to 1,497 units. This project emphasizes innovative architectural designs and energy-efficient systems that enhance the living experience for residents. State-of-the-art security measures are implemented throughout, ensuring the safety of the entire community.",
    heroImage: "https://placehold.co/1920x1080",
    cardImage: "https://placehold.co/800x600",
    galleryImages: [
      "https://placehold.co/1920x1080",
      "https://placehold.co/1920x1080",
      "https://placehold.co/1920x1080",
      "https://placehold.co/1920x1080",
    ],
    houseTypes: [
      "1-Bedroom Apartment Blocks",
      "2-Bedroom Apartment Blocks",
      "3-Bedroom Apartment Blocks",
      "3-Bedroom Terrace Houses",
      "4-Bedroom Terrace Houses",
      "4-Bedroom Semi-Detached Homes",
      "5-Bedroom Terrace Houses",
    ],
    amenities: [
      { icon: "ShoppingBag", label: "Shopping Complex" },
      { icon: "Building", label: "Mosque & Church" },
      { icon: "Route", label: "Quality Infrastructure" },
      { icon: "Shield", label: "24/7 Security" },
      { icon: "Dumbbell", label: "Sports & Recreation" },
      { icon: "Heart", label: "Hospital" },
      { icon: "GraduationCap", label: "School" },
      { icon: "Users", label: "Club House" },
    ],
    featured: true,
  },
  {
    slug: "the-residence-by-dantata",
    title: "The Residence by Dantata",
    location: "Airport Road, Abuja",
    type: "residential",
    status: "ongoing",
    units: 371,
    yearLaunched: 2021,
    description:
      "An upscale 371-unit development on Airport Road featuring premium finishes, luxury layouts, and comprehensive amenities for contemporary living.",
    longDescription:
      "The Residence by Dantata is an upscale development featuring a variety of house types including 4-bedroom semi-detached homes, 4-bedroom terraces, 3-bedroom terraces, 5-bedroom duplexes, and 1, 2, and 3-bedroom apartments — totaling 371 units. Each residence is designed with luxury living in mind, showcasing premium finishes and spacious layouts that cater to contemporary lifestyles. Residents benefit from a range of modern amenities that enhance both comfort and convenience, making The Residence one of the most desirable addresses on Airport Road, Abuja.",
    heroImage: "https://placehold.co/1920x1080",
    cardImage: "https://placehold.co/800x600",
    galleryImages: [
      "https://placehold.co/1920x1080",
      "https://placehold.co/1920x1080",
      "https://placehold.co/1920x1080",
      "https://placehold.co/1920x1080",
    ],
    houseTypes: [
      "4-Bedroom Semi-Detached Homes",
      "4-Bedroom Terraces",
      "3-Bedroom Terraces",
      "5-Bedroom Duplexes",
      "1-Bedroom Apartments",
      "2-Bedroom Apartments",
      "3-Bedroom Apartments",
    ],
    amenities: [
      { icon: "ShoppingBag", label: "Shopping Complex" },
      { icon: "Building", label: "Mosque" },
      { icon: "ShoppingBag", label: "Shops" },
      { icon: "Shield", label: "24/7 Security" },
      { icon: "Dumbbell", label: "Fitness Centre" },
      { icon: "Heart", label: "Pharmacy" },
      { icon: "Baby", label: "Daycare" },
    ],
    featured: true,
  },
  {
    slug: "dantata-square-fagge",
    title: "Dantata Square at Fagge",
    location: "Fagge, Kano",
    type: "mixed-use",
    status: "ongoing",
    units: 164,
    yearLaunched: 2022,
    description:
      "A mixed-use development near Mallam Aminu Kano International Airport combining residential plots and commercial spaces to create a vibrant community hub.",
    longDescription:
      "Dantata Square at Fagge offers a diverse range of house types including residential plots and various commercial spaces for shops and offices. With a total of 164 units, this development is strategically located near Mallam Aminu Kano International Airport. Dantata Square combines residential and commercial spaces, creating a vibrant community hub that fosters business growth while providing quality housing. The project marks DTDL's strategic expansion into Kano, bringing the same infrastructure-first approach that has defined our Abuja developments.",
    heroImage: "https://placehold.co/1920x1080",
    cardImage: "https://placehold.co/800x600",
    galleryImages: [
      "https://placehold.co/1920x1080",
      "https://placehold.co/1920x1080",
      "https://placehold.co/1920x1080",
      "https://placehold.co/1920x1080",
    ],
    houseTypes: ["Residential Plots", "Commercial Shops", "Office Spaces"],
    amenities: [
      { icon: "ShoppingBag", label: "Commercial Spaces" },
      { icon: "Route", label: "Strategic Location" },
      { icon: "Shield", label: "Security" },
    ],
    featured: false,
  },
  {
    slug: "abdulkadir-dantata-city",
    title: "Abdulkadir Dantata City",
    location: "Bompai, Kano",
    type: "residential",
    status: "ongoing",
    units: 981,
    yearLaunched: 2023,
    description:
      "A 981-unit community at Bompai, Kano, designed to enhance quality of life by integrating modern living with essential amenities and convenience.",
    longDescription:
      "Abdulkadir Dantata City is a thoughtfully designed community located at No. 1A Independence Road, Bompai, opposite the post office in Kano. The project features a total of 981 units, offering diverse house types to accommodate various family sizes. Key to its mission is the enhancement of the quality of life for residents, integrating modern living with essential amenities and convenience. Named after the founding family's patriarch, this development represents DTDL's commitment to building communities that last — with complete infrastructure, quality construction, and spaces designed for families to thrive.",
    heroImage: "https://placehold.co/1920x1080",
    cardImage: "https://placehold.co/800x600",
    galleryImages: [
      "https://placehold.co/1920x1080",
      "https://placehold.co/1920x1080",
      "https://placehold.co/1920x1080",
      "https://placehold.co/1920x1080",
    ],
    houseTypes: ["Various Residential Units"],
    amenities: [
      { icon: "ShoppingBag", label: "Shopping Complex" },
      { icon: "Building", label: "Mosque & Church" },
      { icon: "Shield", label: "24/7 Security" },
      { icon: "TreePine", label: "Recreational Park" },
      { icon: "Heart", label: "Clinic" },
      { icon: "GraduationCap", label: "School" },
    ],
    featured: false,
  },
  {
    slug: "dantata-millennium-estate",
    title: "Dantata Millennium Estate",
    location: "Kano",
    type: "mixed-use",
    status: "ongoing",
    units: 164,
    yearLaunched: 2024,
    description:
      "A dynamic community hub near Mallam Aminu Kano International Airport blending residential plots with commercial spaces for shops and offices.",
    longDescription:
      "Dantata Millennium Estate is a dynamic community hub that offers a blend of residential plots and a variety of commercial spaces, including shops and offices. With a total of 164 units, the development is strategically located near Mallam Aminu Kano International Airport, making it an ideal spot for both living and business activities. This unique combination fosters business growth while ensuring residents enjoy quality housing in a vibrant environment. The estate is equipped with comprehensive amenities and infrastructure to support a thriving community.",
    heroImage: "https://placehold.co/1920x1080",
    cardImage: "https://placehold.co/800x600",
    galleryImages: [
      "https://placehold.co/1920x1080",
      "https://placehold.co/1920x1080",
      "https://placehold.co/1920x1080",
      "https://placehold.co/1920x1080",
    ],
    houseTypes: ["Residential Plots", "Commercial Shops", "Office Spaces"],
    amenities: [
      { icon: "ShoppingBag", label: "Shopping Complex" },
      { icon: "Building", label: "Mosque & Church" },
      { icon: "Shield", label: "24/7 Security" },
      { icon: "TreePine", label: "Recreational Park" },
      { icon: "Heart", label: "Clinic" },
      { icon: "GraduationCap", label: "School" },
    ],
    featured: false,
  },
];

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectsByType(type: string): Project[] {
  if (!type || type === "all") return projects;
  return projects.filter((p) => p.type === type);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

export function getTotalUnits(): number {
  return projects.reduce((sum, p) => sum + p.units, 0);
}

export function getTotalEstates(): number {
  return projects.length;
}

