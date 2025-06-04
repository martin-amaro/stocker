import React, { useState } from 'react'
import { X } from 'lucide-react'
import { Modal } from '@mui/base'

export const Dialog = ({
  title = "Título del diálogo",
  children,
  onSave,
  onCancel,
  saveText = "Aceptar",
  cancelText = "Cancelar",
  showActions = true,
  triggerText = "Abrir diálogo",
  triggerClass = null,
  modalClass = ""
}) => {
  const [open, setOpen] = useState(false)
  const [fade, setFade] = useState('in')

  const handleOpen = () => {
    setFade('in')
    setOpen(true)
  }

  const handleClose = () => {
    setFade('out')
    setTimeout(() => setOpen(false), 300)
    if (onCancel) onCancel()
  }

  const handleSave = () => {
    if (onSave) onSave()
    handleClose()
  }

  return (
    <>
      <button
        onClick={handleOpen}
        className={!triggerClass ? `px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition` : triggerClass}
      >
        {triggerText}
      </button>

      <Modal open={open} onClose={handleClose}>
        <div
          className={`fixed inset-0 z-100 bg-black/80 flex items-center justify-center ${fade === 'in' ? 'animate-fade-in' : 'animate-fade-out'} animate-duration-100`}
        >
          <div className={`bg-white text-black rounded-xl shadow-xl w-full max-w-md mx-4 ${modalClass}`}>
            <div className="py-3 px-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold">{title}</h2>
              <button
                className="btn-secondary p-3"
                onClick={handleClose}>
                <X className="size-5 text-neutral-900" />
              </button>
            </div>

            <div className="px-6 py-4">
              {children}
            </div>

            {showActions && (
              <div className="flex justify-end mt-6 gap-2 py-3 px-4 border-t border-gray-200">
                <button
                  onClick={handleClose}
                  className="btn-secondary"
                >
                  {cancelText}
                </button>

                <button
                  onClick={handleSave}
                  className="btn-main m-0! rounded-md! shadow-none!"
                >
                  {saveText}
                </button>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  )
}
