// src/components/SuccessModal.tsx

import React from "react"
import "./Modal.css"

export interface ModalProps {
  isOpen: boolean
  title?: string
  message: string
  onClose: () => void
  duration?: number
  showCloseButton?: boolean
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title = "Success",
  message,
  onClose,
  duration,
  showCloseButton = true,
}) => {
  React.useEffect(() => {
    if (isOpen && duration) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [isOpen, duration, onClose])

  if (!isOpen) return null

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{title}</h2>
        <p>{message}</p>
        {showCloseButton && (
          <button
            className="close-button"
            onClick={onClose}
          >
            Close
          </button>
        )}
      </div>
    </div>
  )
}

export default Modal
