import { createContext, useState, ReactNode } from "react";

type LayoutType = "primary" | "secondary" | "tertiary";

export interface ILayoutContextProps {
    layout: LayoutType;
    setLayout: (layout: LayoutType) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const LayoutContext = createContext<ILayoutContextProps | undefined>(undefined);

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
    const [layout, setLayout] = useState<LayoutType>("primary");

    return (
        <LayoutContext.Provider value={{ layout, setLayout }}>
            {children}
        </LayoutContext.Provider>
    );
};
