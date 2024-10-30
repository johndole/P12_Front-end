import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createEmployeeSchema, Employee } from "./CreateEmployeeForm.validation"
import "./CreateEmployeeForm.css"
import logo from "../../assets/logo.png"
import { v4 as uuidv4 } from "uuid"
import { useGlobalState } from "../../store/globalStoreContext"
import { useNavigate } from "react-router-dom"
import Select from "react-select"
import states from "states-us"

const EmployeeForm: React.FC = () => {
  const { dispatch } = useGlobalState()
  const [isProcessing, setIsProcessing] = useState(false)
  const navigate = useNavigate()

  // Dropdown options
  const stateOptions = states.map((state) => ({
    value: state.abbreviation,
    label: state.name,
  }))

  const departmentOptions = [
    { value: "sales", label: "Sales" },
    { value: "marketing", label: "Marketing" },
    { value: "engineering", label: "Engineering" },
    { value: "human_resources", label: "Human Resources" },
    { value: "legal", label: "Legal" },
  ]

  // Default values
  const defaultStateValue = stateOptions[0].value
  const defaultDepartmentValue = departmentOptions[0].value

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
    trigger,
  } = useForm<Employee>({
    resolver: zodResolver(createEmployeeSchema),
    mode: "onChange",
    defaultValues: {
      state: defaultStateValue,
      department: defaultDepartmentValue,
    },
  })

  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Manually register state and department fields
  useEffect(() => {
    register("state", { required: "State is required" })
    register("department", { required: "Department is required" })
  }, [register])

  // Handle form submission
  const onSubmit = (data: Employee) => {
    setIsProcessing(true)
    const employeeData = {
      ...data,
      id: uuidv4(),
    }

    // Dispatch the employee data
    dispatch({ type: "add_employee", payload: employeeData })

    console.log("Employee data submitted:", employeeData)
    setSuccessMessage("Employee added successfully!")

    // Navigate after 1.5 seconds
    setTimeout(() => {
      navigate("/employee-list")
    }, 1500)

    setIsProcessing(false)
    reset({
      state: defaultStateValue,
      department: defaultDepartmentValue,
    })
  }

  return (
    <div className="container">
      <img
        src={logo}
        alt="Company Logo"
        className="logo"
      />
      <h2 className="form-title">Create Employee</h2>
      {successMessage && (
        <div
          className="success-message"
          role="alert"
        >
          {successMessage}
        </div>
      )}
      <button
        className="employee-list-button"
        onClick={() => navigate("/employee-list")}
      >
        Navigate to employee list
      </button>
      <form
        className="employee-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {/* First Row: First Name & Last Name */}
        <div className="form-row">
          {/* First Name */}
          <div className="form-group">
            <label
              htmlFor="firstName"
              className="form-label"
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="Enter First Name"
              className={`form-input ${errors.firstName ? "input-error" : ""}`}
              {...register("firstName")}
              aria-invalid={errors.firstName ? "true" : "false"}
              aria-describedby={
                errors.firstName ? "firstName-error" : undefined
              }
            />
            {errors.firstName && (
              <p
                id="firstName-error"
                className="error-message"
                role="alert"
              >
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div className="form-group">
            <label
              htmlFor="lastName"
              className="form-label"
            >
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Enter Last Name"
              className={`form-input ${errors.lastName ? "input-error" : ""}`}
              {...register("lastName")}
              aria-invalid={errors.lastName ? "true" : "false"}
              aria-describedby={errors.lastName ? "lastName-error" : undefined}
            />
            {errors.lastName && (
              <p
                id="lastName-error"
                className="error-message"
                role="alert"
              >
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        {/* Second Row: Date of Birth & Start Date */}
        <div className="form-row">
          {/* Date of Birth */}
          <div className="form-group">
            <label
              htmlFor="dateOfBirth"
              className="form-label"
            >
              Date of Birth
            </label>
            <input
              id="dateOfBirth"
              type="date"
              className={`form-input ${
                errors.dateOfBirth ? "input-error" : ""
              }`}
              {...register("dateOfBirth")}
              aria-invalid={errors.dateOfBirth ? "true" : "false"}
              aria-describedby={
                errors.dateOfBirth ? "dateOfBirth-error" : undefined
              }
            />
            {errors.dateOfBirth && (
              <p
                id="dateOfBirth-error"
                className="error-message"
                role="alert"
              >
                {errors.dateOfBirth.message}
              </p>
            )}
          </div>

          {/* Start Date */}
          <div className="form-group">
            <label
              htmlFor="startDate"
              className="form-label"
            >
              Start Date
            </label>
            <input
              id="startDate"
              type="date"
              className={`form-input ${errors.startDate ? "input-error" : ""}`}
              {...register("startDate")}
              aria-invalid={errors.startDate ? "true" : "false"}
              aria-describedby={
                errors.startDate ? "startDate-error" : undefined
              }
            />
            {errors.startDate && (
              <p
                id="startDate-error"
                className="error-message"
                role="alert"
              >
                {errors.startDate.message}
              </p>
            )}
          </div>
        </div>

        {/* Third Row: State & Department */}
        <div className="form-row">
          {/* State */}
          <div className="form-group">
            <label
              htmlFor="state"
              className="form-label"
            >
              State
            </label>
            <Select
              id="state"
              options={stateOptions}
              value={stateOptions.find(
                (option) => option.value === watch("state")
              )}
              onChange={(option) => {
                setValue("state", option?.value || "")
                trigger("state") // Trigger validation
              }}
              className={`react-select ${errors.state ? "input-error" : ""}`}
              placeholder="Select State"
            />
            {errors.state && (
              <p
                id="state-error"
                className="error-message"
                role="alert"
              >
                {errors.state.message}
              </p>
            )}
          </div>

          {/* Department */}
          <div className="form-group">
            <label
              htmlFor="department"
              className="form-label"
            >
              Department
            </label>
            <Select
              id="department"
              options={departmentOptions}
              value={departmentOptions.find(
                (option) => option.value === watch("department")
              )}
              onChange={(option) => {
                setValue("department", option?.value || "")
                trigger("department") // Trigger validation
              }}
              className={`react-select ${
                errors.department ? "input-error" : ""
              }`}
              placeholder="Select Department"
            />
            {errors.department && (
              <p
                id="department-error"
                className="error-message"
                role="alert"
              >
                {errors.department.message}
              </p>
            )}
          </div>
        </div>

        {/* Fourth Row: Street & City */}
        <div className="form-row">
          {/* Street */}
          <div className="form-group">
            <label
              htmlFor="street"
              className="form-label"
            >
              Street
            </label>
            <input
              id="street"
              type="text"
              placeholder="Enter Street Address"
              className={`form-input ${errors.street ? "input-error" : ""}`}
              {...register("street")}
              aria-invalid={errors.street ? "true" : "false"}
              aria-describedby={errors.street ? "street-error" : undefined}
            />
            {errors.street && (
              <p
                id="street-error"
                className="error-message"
                role="alert"
              >
                {errors.street.message}
              </p>
            )}
          </div>

          {/* City */}
          <div className="form-group">
            <label
              htmlFor="city"
              className="form-label"
            >
              City
            </label>
            <input
              id="city"
              type="text"
              placeholder="Enter City"
              className={`form-input ${errors.city ? "input-error" : ""}`}
              {...register("city")}
              aria-invalid={errors.city ? "true" : "false"}
              aria-describedby={errors.city ? "city-error" : undefined}
            />
            {errors.city && (
              <p
                id="city-error"
                className="error-message"
                role="alert"
              >
                {errors.city.message}
              </p>
            )}
          </div>
        </div>

        {/* Fifth Row: ZIP Code */}
        <div className="form-row single-input">
          {/* ZIP Code */}
          <div className="form-group">
            <label
              htmlFor="zip"
              className="form-label"
            >
              ZIP Code
            </label>
            <input
              id="zip"
              type="text"
              placeholder="Enter ZIP Code"
              className={`form-input ${errors.zip ? "input-error" : ""}`}
              {...register("zip")}
              aria-invalid={errors.zip ? "true" : "false"}
              aria-describedby={errors.zip ? "zip-error" : undefined}
              maxLength={5} // Enforce 5 digits
            />
            {errors.zip && (
              <p
                id="zip-error"
                className="error-message"
                role="alert"
              >
                {errors.zip.message}
              </p>
            )}
          </div>
        </div>

        <button
          className="submit-button"
          type="submit"
          disabled={isProcessing}
        >
          {isProcessing ? "Creating employee..." : "Add Employee"}
        </button>
      </form>
    </div>
  )
}

export default EmployeeForm
