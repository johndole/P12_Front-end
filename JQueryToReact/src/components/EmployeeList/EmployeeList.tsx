import React, { useState } from "react"
import { useGlobalState } from "../../store/globalStoreContext"
import ShowEntries from "../ShowEntries/ShowEntries"
import SearchBar from "../SearchBar/SearchBar"
import Pagination from "../Pagination/Pagination"
import "./EmployeeList.css"
import { sortEmployees } from "../../utils/sortEmployees"
import { filterEmployees } from "../../utils/filterEmployee"
import { useNavigate } from "react-router-dom"
import { FaArrowUp, FaArrowDown } from "react-icons/fa"

const EmployeeList: React.FC = () => {
  const { state, dispatch } = useGlobalState()
  const [entriesPerPage, setEntriesPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<{
    key: string
    direction: string
  } | null>(null)
  const navigate = useNavigate()

  const handleRemove = (id: string) => {
    if (window.confirm("Are you sure you want to remove this employee?")) {
      dispatch({ type: "remove_employee", payload: id })
    }
  }

  const handleSort = (key: string) => {
    let direction = "ascending"
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  const sortedEmployees = sortEmployees(state.employees, sortConfig)
  const filteredEmployees = filterEmployees(sortedEmployees, searchTerm)

  const totalPages = Math.ceil(filteredEmployees.length / entriesPerPage)
  const currentEmployees = filteredEmployees.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  )

  const renderSortIcon = (key: string) => {
    if (sortConfig && sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? (
        <FaArrowUp className="sort-icon" />
      ) : (
        <FaArrowDown className="sort-icon" />
      )
    }
    return (
      <span className="sort-icons">
        <FaArrowUp className="arrow-up" />
        <FaArrowDown className="arrow-down" />
      </span>
    )
  }

  return (
    <div className="employee-list-container">
      <button
        className="back-button"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
      <h2 className="list-title">Employee List</h2>
      <div className="space-between-wrapper">
        <ShowEntries
          entriesPerPage={entriesPerPage}
          setEntriesPerPage={setEntriesPerPage}
          options={[10, 25, 50, 100]}
        />
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
      {filteredEmployees.length === 0 ? (
        <p className="no-employees">
          No employees found. Please add some employees.
        </p>
      ) : (
        <div className="table-responsive">
          <table className="employee-table">
            <thead>
              <tr>
                <th onClick={() => handleSort("firstName")}>
                  First Name{" "}
                  <span className="sort-icon-wrapper">
                    {renderSortIcon("firstName")}
                  </span>
                </th>
                <th onClick={() => handleSort("lastName")}>
                  Last Name{" "}
                  <span className="sort-icon-wrapper">
                    {renderSortIcon("lastName")}
                  </span>
                </th>
                <th onClick={() => handleSort("dateOfBirth")}>
                  Date of Birth{" "}
                  <span className="sort-icon-wrapper">
                    {renderSortIcon("dateOfBirth")}
                  </span>
                </th>
                <th onClick={() => handleSort("startDate")}>
                  Start Date{" "}
                  <span className="sort-icon-wrapper">
                    {renderSortIcon("startDate")}
                  </span>
                </th>
                <th onClick={() => handleSort("street")}>
                  Street{" "}
                  <span className="sort-icon-wrapper">
                    {renderSortIcon("street")}
                  </span>
                </th>
                <th onClick={() => handleSort("city")}>
                  City{" "}
                  <span className="sort-icon-wrapper">
                    {renderSortIcon("city")}
                  </span>
                </th>
                <th onClick={() => handleSort("state")}>
                  State{" "}
                  <span className="sort-icon-wrapper">
                    {renderSortIcon("state")}
                  </span>
                </th>
                <th onClick={() => handleSort("zip")}>
                  ZIP Code{" "}
                  <span className="sort-icon-wrapper">
                    {renderSortIcon("zip")}
                  </span>
                </th>
                <th onClick={() => handleSort("department")}>
                  Department{" "}
                  <span className="sort-icon-wrapper">
                    {renderSortIcon("department")}
                  </span>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td data-label="First Name">{employee.firstName}</td>
                  <td data-label="Last Name">{employee.lastName}</td>
                  <td data-label="Date of Birth">
                    {new Date(employee.dateOfBirth).toLocaleDateString()}
                  </td>
                  <td data-label="Start Date">
                    {new Date(employee.startDate).toLocaleDateString()}
                  </td>
                  <td data-label="Street">{employee.street}</td>
                  <td data-label="City">{employee.city}</td>
                  <td data-label="State">{employee.state}</td>
                  <td data-label="ZIP Code">{employee.zip}</td>
                  <td data-label="Department">{employee.department}</td>
                  <td data-label="Actions">
                    <button
                      className="action-button remove-button"
                      onClick={() => handleRemove(employee.id)}
                      aria-label={`Remove ${employee.firstName} ${employee.lastName}`}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  )
}

export default EmployeeList
