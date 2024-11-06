# @meruem-senpai/react-modal-openclassroom

![npm version](https://img.shields.io/npm/v/@meruem-senpai/react-modal-openclassroom)
![license](https://img.shields.io/npm/l/@meruem-senpai/react-modal-openclassroom)
![npm downloads](https://img.shields.io/npm/dt/@meruem-senpai/react-modal-openclassroom)

A **customizable** and **reusable** success notification modal component for
React applications, built with **TypeScript** and **Vite**. Perfect for
displaying success messages, such as confirming the addition of an employee.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Basic Example](#basic-example)
  - [Customization](#customization)
- [Props](#props)
- [Styling](#styling)
- [License](#license)

## Installation

Install the package via npm:

```bash
npm install @meruem-senpai/react-modal-openclassroom
```

Or using Yarn:

```bash
yarn add @meruem-senpai/react-modal-openclassroom
```

```bash
import { Modal } from "@meruem-senpai/react-modal-openclassroom"
```

```bash
import "@meruem-senpai/react-modal-openclassroom/dist/index.css"
```

## Usage

## Basic Example

Here's how to integrate the Modal component into your React application:

```tsx
import React, { useState } from "react"
import { Modal } from "@meruem-senpai/react-modal-openclassroom"

const EmployeeForm: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Perform form submission logic here

    // Open the success modal
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    // Optionally navigate to another page or perform other actions
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Your form fields go here */}
        <button type="submit">Submit</button>
      </form>

      <Modal
        isOpen={isModalOpen}
        title="Success"
        message="Employee added successfully!"
        onClose={handleCloseModal}
        duration={3000} // Modal will auto-close after 3 seconds
        showCloseButton={true} // Displays a close button
      />
    </div>
  )
}

export default EmployeeForm
```

## Customization

The Modal component is highly customizable through its props. Here's how you can
tailor it to fit your needs:

```tsx
<Modal
  isOpen={isModalOpen}
  title="Congratulations!"
  message="Your action was successful."
  onClose={handleCloseModal}
  duration={5000} // Auto-close after 5 seconds
  showCloseButton={false} // Hide the close button
/>
```

## Props

| Prop              | Type         | Required | Description                                                                                          |
| ----------------- | ------------ | -------- | ---------------------------------------------------------------------------------------------------- |
| `isOpen`          | `boolean`    | Yes      | Controls the visibility of the Modal.                                                                |
| `title`           | `string`     | Yes      | The title displayed at the top of the Modal.                                                         |
| `message`         | `string`     | Yes      | The main content/message of the Modal.                                                               |
| `onClose`         | `() => void` | Yes      | Callback function triggered when the Modal is closed.                                                |
| `duration`        | `number`     | No       | Time in milliseconds after which the Modal auto-closes. If not provided, it stays open until closed. |
| `showCloseButton` | `boolean`    | No       | Determines if a close button is displayed inside the Modal. Defaults to `true`.                      |

## License

This project is licensed under the MIT License.
