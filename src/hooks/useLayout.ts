import { useContext } from "react";

import { ILayoutContextProps, LayoutContext } from "../contexts/LayoutContext";


export const useLayout = (): ILayoutContextProps => {
    const context = useContext(LayoutContext);
    if (!context) {
      throw new Error("useLayout must be used within a LayoutProvider");
    }
    return context;
};