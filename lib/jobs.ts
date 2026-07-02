export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "full-time" | "contract" | "part-time";
  description: string;
  requirements: string[];
  posted: string;
}

export const jobs: Job[] = [
  {
    id: "civil-engineer-sr",
    title: "Senior Civil Engineer",
    department: "Infrastructure",
    location: "Abuja, FCT",
    type: "full-time",
    description:
      "Lead the design and supervision of road networks, drainage systems, and earthworks across our estate developments. You will work closely with project managers to ensure infrastructure delivery meets our exacting standards.",
    requirements: [
      "B.Sc/M.Sc in Civil Engineering",
      "COREN registration required",
      "Minimum 8 years experience in infrastructure development",
      "Proficiency in AutoCAD and Civil 3D",
      "Experience managing contractor relationships",
    ],
    posted: "2026-02-10",
  },
  {
    id: "project-manager",
    title: "Project Manager",
    department: "Development",
    location: "Lagos, Nigeria",
    type: "full-time",
    description:
      "Oversee end-to-end delivery of residential and mixed-use developments. Coordinate cross-functional teams, manage budgets, and ensure projects are delivered on time and to specification.",
    requirements: [
      "B.Sc in Engineering, Architecture, or Project Management",
      "PMP certification preferred",
      "Minimum 6 years experience in real estate development",
      "Strong budget management and reporting skills",
      "Excellent stakeholder communication abilities",
    ],
    posted: "2026-02-05",
  },
  {
    id: "sales-manager",
    title: "Sales & Marketing Manager",
    department: "Commercial",
    location: "Abuja, FCT",
    type: "full-time",
    description:
      "Drive sales strategy and execution across our portfolio of estates. Build and manage a high-performing sales team, develop marketing campaigns, and maintain relationships with high-net-worth clients and institutional buyers.",
    requirements: [
      "B.Sc in Marketing, Business, or related field",
      "Minimum 5 years in real estate sales or property marketing",
      "Proven track record of exceeding sales targets",
      "Experience with CRM systems and digital marketing",
      "Strong presentation and negotiation skills",
    ],
    posted: "2026-01-28",
  },
  {
    id: "quantity-surveyor",
    title: "Quantity Surveyor",
    department: "Cost Management",
    location: "Abuja, FCT",
    type: "full-time",
    description:
      "Manage cost planning, procurement, and financial control for estate development projects. Prepare bills of quantities, evaluate tenders, and ensure cost efficiency throughout the project lifecycle.",
    requirements: [
      "B.Sc in Quantity Surveying",
      "NIQS membership required",
      "Minimum 5 years experience in construction cost management",
      "Proficiency in cost estimation software",
      "Strong analytical and reporting skills",
    ],
    posted: "2026-01-20",
  },
];

export function getAllJobs(): Job[] {
  return jobs;
}

export function getJobById(id: string): Job | undefined {
  return jobs.find((j) => j.id === id);
}
