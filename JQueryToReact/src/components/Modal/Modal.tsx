// src/components/Modal.tsx
import React, { useEffect } from "react"
import "./Modal.css"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  showCloseButton?: boolean
  closeOnOverlayClick?: boolean
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  showCloseButton = true,
  closeOnOverlayClick = true,
}) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose()
      }
    }
    document.addEventListener("keydown", handleEscape)
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="modal-overlay"
      onClick={handleOverlayClick}
    >
      <div className="modal">
        {showCloseButton && (
          <button
            className="close-modal"
            onClick={onClose}
            aria-label="Close Modal"
          >
            &times;
          </button>
        )}
        {children}
      </div>
    </div>
  )
}

export default Modal
