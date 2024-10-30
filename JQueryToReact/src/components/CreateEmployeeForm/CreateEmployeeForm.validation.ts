// CreateEmployeeForm.validation.ts
import { z } from "zod"

// Helper function to calculate age
const calculateAge = (dateString: string): number => {
  const today = new Date()
  const birthDate = new Date(dateString)
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }

  return age
}

// Define the Zod schema
export const createEmployeeSchema = z.object({
  id: z.string().optional(), // Assuming 'id' is optional and generated elsewhere
  firstName: z
    .string()
    .min(1, { message: "First name is required" })
    .max(50, { message: "First name cannot exceed 50 characters" }),
  lastName: z
    .string()
    .min(1, { message: "Last name is required" })
    .max(50, { message: "Last name cannot exceed 50 characters" }),
  dateOfBirth: z
    .string()
    .min(1, { message: "Date of Birth is required" })
    .refine((str) => !isNaN(Date.parse(str)), {
      message: "Invalid date format",
    })
    .refine((str) => calculateAge(str) >= 18, {
      message: "Employee must be at least 18 years old",
    }),
  startDate: z
    .string()
    .min(1, { message: "Start Date is required" })
    .refine((str) => !isNaN(Date.parse(str)), {
      message: "Invalid date format",
    }),
  street: z.string().min(1, { message: "Street is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, "State is required"),
  department: z.string().min(1, "Department is required"),
  zip: z
    .string()
    .regex(/^[0-9]{5}$/, { message: "ZIP Code must be exactly 5 digits" }),
})

export type Employee = z.infer<typeof createEmployeeSchema>
