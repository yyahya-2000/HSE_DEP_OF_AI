import { FC, useState } from 'react'
import { ChildrenProps } from 'types'
import { MenuContext } from '.'

const MenuProvider: FC<ChildrenProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const setOpenMenu = (newState: boolean) => {
    setIsOpen(newState)
  }
  return (
    <MenuContext.Provider
      value={{
        isOpen,
        setOpenMenu
      }}
    >
      {children}
    </MenuContext.Provider>
  )
}

export default MenuProvider
