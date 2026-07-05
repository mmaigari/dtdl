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

// No open roles at the moment. When hiring reopens, add entries here —
// the careers page will automatically switch from the empty state to the
// filterable list.
export const jobs: Job[] = [];

export function getAllJobs(): Job[] {
  return jobs;
}

export function getJobById(id: string): Job | undefined {
  return jobs.find((j) => j.id === id);
}
