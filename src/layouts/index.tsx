import { ReactNode } from "react";

import { LAYOUT_VALUES } from "../resources/constants";
import ColorSwitch from "../components/ColorSwitcher";
import { useLayout } from "../hooks/useLayout";
import Navbar from '../components/Navbar';


const Layout = ({ children }: { children: ReactNode }) => {
    const { layout } = useLayout();

    const layoutClasses: Record<string, string> = {
        [LAYOUT_VALUES.PRIMARY]: "bg-primary-main text-[#FFFFF0]",
        [LAYOUT_VALUES.SECONDARY]: "bg-secondary-main text-[#6096BA]",
        [LAYOUT_VALUES.TERTIARY]: "bg-tertiary-main text-[#7E78D2]",
    };

    return (
        <div className={`${layoutClasses[layout]} min-h-screen flex flex-col overflow-hidden group`}>
            <main className="relative flex-1 pb-48">
                {children}
            </main>
            <div className="fixed z-50 bottom-4 right-4">
                <ColorSwitch />
            </div>
            <Navbar />
        </div>
    );
};

export default Layout;