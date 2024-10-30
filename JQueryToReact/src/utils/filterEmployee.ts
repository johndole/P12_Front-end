import { Employee } from "../models/employee"

// filterHelpers.ts
export const filterEmployees = (employees: Employee[], searchTerm: string) => {
  if (!searchTerm) return employees

  return employees.filter((employee) =>
    Object.values(employee)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  )
}
