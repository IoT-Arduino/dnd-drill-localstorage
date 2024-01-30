import { useCallback, useEffect, useRef } from 'react'
import { RemoveScroll } from 'react-remove-scroll'

import classes from './Dialog.module.scss'

type Props = {
  isOpen?: boolean
  children?: React.ReactNode
  onClose?: VoidFunction
}

export const Dialog: React.FC<Props> = ({ isOpen = false, children, onClose }: Props): React.ReactElement | null => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect((): void => {
    const dialogElement = dialogRef.current
    if (!dialogElement) {
      return
    }
    if (isOpen) {
      if (dialogElement.hasAttribute('open')) {
        return
      }
      dialogElement.showModal()
    } else {
      if (!dialogElement.hasAttribute('open')) {
        return
      }
      dialogElement.close()
    }
  }, [isOpen])

  const handleClickDialog = useCallback(
    (event: React.MouseEvent<HTMLDialogElement>): void => {
      ;[event]
      onClose?.()
    },
    [onClose]
  )

  const handleClickContent = useCallback((event: React.MouseEvent<HTMLDivElement>): void => {
    event.stopPropagation()
  }, [])

  return (
    <RemoveScroll removeScrollBar enabled={isOpen}>
      <dialog className={classes['dialog']} ref={dialogRef} onClick={handleClickDialog}>
        <div className={classes['dialog-content']} onClick={handleClickContent}>
          {children}
        </div>
      </dialog>
    </RemoveScroll>
  )
}
