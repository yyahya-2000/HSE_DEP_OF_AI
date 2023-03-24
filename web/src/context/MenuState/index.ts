import { createContext, useContext } from "react";
import { MenuContext as MenuContextType } from "./Menu.types";

const MenuContext = createContext<MenuContextType>({} as MenuContextType);

const useMenuState = () => useContext(MenuContext);

export { useMenuState, MenuContext };
