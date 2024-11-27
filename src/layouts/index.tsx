import { ReactNode } from "react";

import Navbar from '../components/Navbar';
import { useLayout } from "../hooks/useLayout";


const Layout = ({ children }: { children: ReactNode }) => {
    const { layout } = useLayout();

    const layoutClasses: Record<string, string> = {
        primary: "bg-primary-main text-[#FFFFF0]",
        secondary: "bg-secondary-main text-[#6096BA]",
        tertiary: "bg-tertiary-main text-[#7E78D2]",
    };

    return (
        <div className={`${layoutClasses[layout]} min-h-screen flex flex-col`}>
            {children}
            <Navbar />
        </div>
    );
};

export default Layout;