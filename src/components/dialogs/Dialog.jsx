import React, { useState } from 'react'
import { X } from 'lucide-react'
import { Modal } from '@mui/base'
import { Dialog as Diag} from '@base-ui-components/react/dialog';
import { ErrorMessage } from './../auth/ErrorMessage';
import { ButtonMain } from './../gui/ButtonMain';

export const Dialog = ({
  title = "Título del diálogo",
  children,
  onSave,
  onCancel,
  buttonText = "Aceptar",
  buttonClass = "btn-main",
  showActions = true,
  triggerText = "Abrir diálogo",
  triggerClass = null,
  triggerIcon = (<></>),
  triggerClick = () => {},
  modalClass = "",
  canSave = null,
  openDef = false
}) => {



  const handleClose = () => {
    if (onCancel) onCancel()
  }

  const handleSave = async () => {
    setLoading(true);
    if (onSave) await onSave();
    setOpen(false);
    setLoading(false);
  }

  const [open, setOpen] = useState(openDef);
  const [loading, setLoading] = useState(false);

  return (
    <Diag.Root dismissible={false} open={open}  onOpenChange={setOpen}>
      <Diag.Trigger
        className={!triggerClass ? `px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition` : triggerClass}
        onClick={triggerClick}
      >
        {triggerIcon}
        {triggerText}
      </Diag.Trigger>

      <Diag.Portal>
        <Diag.Backdrop className="fixed z-100 inset-0 bg-black opacity-20 transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:opacity-70" />
          
          <Diag.Popup className={
            `bg-white text-black rounded-xl shadow-xl w-full max-w-md  ${modalClass}` +
            `z-100 fixed top-1/2 left-1/2 -mt-8 w-full -translate-x-1/2 -translate-y-1/2 rounded-xl transition-all duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 dark:outline-gray-300`
            
            }>
            <div className="py-3 px-4 border-b border-gray-200 flex justify-between items-center">
              <Diag.Title className="text-xl font-semibold">{title}</Diag.Title>
              <Diag.Close
                className="btn-secondary p-3"
                onClick={handleClose}>
                <X className="size-5 text-neutral-900" />
              </Diag.Close>
            </div>

            <div className="px-6 py-4">

              {children}
              {typeof canSave === "string" && <ErrorMessage className="mt-3" message={canSave} /> }
            </div>

            {showActions && (
              <div className="flex justify-end mt-6 gap-2 py-3 px-4 border-t border-gray-200">
                <ButtonMain
                  disabled={canSave ? true : false}
                  loading={loading}
                  onClick={handleSave}
                  skin={buttonClass}
                  className='rounded-md! '
                  >
                  {buttonText}
                </ButtonMain>
              </div>
            )}
          </Diag.Popup>
      </Diag.Portal>
     </Diag.Root>
  )
}
