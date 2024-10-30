// hrnet-react-conversion-app/src/App.js
import { faker } from "@faker-js/faker"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import CreateEmployeeForm from "./components/CreateEmployeeForm/CreateEmployeeForm"
import EmployeeList from "./components/EmployeeList/EmployeeList"
import "./app.css"
import { LOCAL_STORAGE_KEY } from "./store/globalStoreContext"
import { Employee } from "./models/employee"

if (localStorage.getItem(LOCAL_STORAGE_KEY) === null) {
  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify({
      employees: Array.from(Array(30).keys()).map<Employee>((id) => ({
        id: id.toString(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        dateOfBirth: faker.date.birthdate().toDateString(),
        startDate: faker.date.past().toDateString(),
        department: faker.company.buzzAdjective(),
        city: faker.location.city(),
        state: faker.location.state(),
        street: faker.location.street(),
        zip: faker.location.zipCode(),
      })),
    })
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<CreateEmployeeForm />}
        />
        <Route
          path="/employee-list"
          element={<EmployeeList />}
        />
      </Routes>
    </Router>
  )
}

export default App
