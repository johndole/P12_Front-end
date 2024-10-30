// globalStoreContext.ts
import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  Dispatch,
  useEffect,
} from "react"
import { Employee } from "../models/employee"

type StateType = {
  employees: Employee[]
}

type ActionType =
  | { type: "add_employee"; payload: Employee }
  | { type: "remove_employee"; payload: string }
  | { type: "update_employee"; payload: Employee }

// Key used in Local Storage
export const LOCAL_STORAGE_KEY = "employees_data"

// Initial state
const initialState: StateType = {
  employees: [],
}

// Reducer function
const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "add_employee":
      return { ...state, employees: [...state.employees, action.payload] }
    case "remove_employee":
      return {
        ...state,
        employees: state.employees.filter(
          (employee) => employee.id !== action.payload
        ),
      }
    case "update_employee":
      return {
        ...state,
        employees: state.employees.map((employee) =>
          employee.id === action.payload.id ? action.payload : employee
        ),
      }
    default:
      throw new Error("Unhandled action type")
  }
}

// Create context interface
interface GlobalStateContextProps {
  state: StateType
  dispatch: Dispatch<ActionType>
}

// Create context
const GlobalStateContext = createContext<GlobalStateContextProps | undefined>(
  undefined
)

// Provider component
export const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Function to load state from Local Storage
  const loadFromLocalStorage = (): StateType => {
    try {
      const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (serializedState === null) {
        console.log(
          "No existing state found in Local Storage. Using initial state."
        )
        return initialState
      }
      const parsedState = JSON.parse(serializedState) as StateType
      console.log("Loaded state from Local Storage:", parsedState)
      return parsedState
    } catch (err) {
      console.error("Failed to load state from Local Storage:", err)
      return initialState
    }
  }

  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    loadFromLocalStorage
  )

  // Save state to Local Storage whenever it changes
  useEffect(() => {
    try {
      const serializedState = JSON.stringify(state)
      localStorage.setItem(LOCAL_STORAGE_KEY, serializedState)
      console.log("State saved to Local Storage:", state)
    } catch (err) {
      console.error("Failed to save state to Local Storage:", err)
    }
  }, [state])

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  )
}

// Custom hook to use the GlobalStateContext
export const useGlobalState = (): GlobalStateContextProps => {
  const context = useContext(GlobalStateContext)
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider")
  }
  return context
}
