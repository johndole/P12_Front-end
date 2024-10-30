// sortHelpers.ts
export const sortEmployees = (
  employees: any[],
  sortConfig: { key: string; direction: string } | null
) => {
  if (!sortConfig) return employees

  const sortedEmployees = [...employees].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1
    }
    return 0
  })

  return sortedEmployees
}
