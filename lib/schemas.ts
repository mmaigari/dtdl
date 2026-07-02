import { z } from "zod";

export const ExpressInterestSchema = z.object({
  name: z.string().min(2, "Please share your full name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone number"),
  project: z.string().min(1, "Please choose a project"),
  budget: z.string().min(1, "Please choose a budget range"),
  unitType: z.string().min(1, "Please pick a unit type"),
  message: z.string().max(1000).optional().or(z.literal("")),
});
export type ExpressInterestInput = z.infer<typeof ExpressInterestSchema>;

export const ScheduleVisitSchema = z.object({
  name: z.string().min(2, "Please share your full name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone number"),
  project: z.string().min(1, "Please choose a project"),
  date: z.string().min(1, "Choose a date"),
  time: z.string().min(1, "Choose a time"),
  party: z.string().min(1, "Tell us the size of your party"),
  notes: z.string().max(800).optional().or(z.literal("")),
});
export type ScheduleVisitInput = z.infer<typeof ScheduleVisitSchema>;

export const ContactSchema = z.object({
  fullName: z.string().min(2, "Please share your full name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional().or(z.literal("")),
  subject: z.string().min(1, "Choose a subject"),
  message: z.string().min(10, "A few more details would help"),
});
export type ContactInput = z.infer<typeof ContactSchema>;

export const ApplicationSchema = z.object({
  fullName: z.string().min(2, "Please share your full name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone number"),
  position: z.string().min(1, "Choose a position"),
  cvName: z.string().optional().or(z.literal("")),
  cvBase64: z.string().optional().or(z.literal("")),
  coverLetter: z.string().max(2000).optional().or(z.literal("")),
});
export type ApplicationInput = z.infer<typeof ApplicationSchema>;
