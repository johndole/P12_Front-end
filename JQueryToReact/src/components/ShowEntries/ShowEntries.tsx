// ShowEntries.tsx
import React from "react"

interface ShowEntriesProps {
  entriesPerPage: number
  setEntriesPerPage: (value: number) => void
  options: number[]
}

const ShowEntries: React.FC<ShowEntriesProps> = ({
  entriesPerPage,
  setEntriesPerPage,
  options,
}) => {
  return (
    <div className="show-entries">
      <label htmlFor="entriesSelect">Show entries: </label>
      <select
        id="entriesSelect"
        value={entriesPerPage}
        onChange={(e) => setEntriesPerPage(Number(e.target.value))}
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default ShowEntries
