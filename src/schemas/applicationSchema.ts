import { z } from "zod";
import { APPLICATION_STATUSES } from "../types/application";

export const applicationSchema = z.object({
  company: z.string().trim().min(2, "Company must be at least 2 characters"),
  position: z.string().trim().min(2, "Position must be at least 2 characters"),
  status: z.enum(APPLICATION_STATUSES),
  location: z.string().trim().min(2, "Location is required"),
  deadline: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || /^\d{4}-\d{2}-\d{2}$/.test(value),
      "Use the format YYYY-MM-DD (e.g. 2026-12-15)"
    ),
  notes: z.string().trim().max(300, "Notes must be 300 characters or less"),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;