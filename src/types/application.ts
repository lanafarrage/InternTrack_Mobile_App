export const APPLICATION_STATUSES = [
    "Interested",
    "Applied",
    "Interview",
    "Accepted",
    "Rejected",
  ] as const;
  
  export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];
  
  export type Application = {
    id: string;
    company: string;
    position: string;
    status: ApplicationStatus;
    location: string;
    deadline: string; // "YYYY-MM-DD", or "" if none
    notes: string;
    createdAt: string; // ISO date, used for "recently added"
  };