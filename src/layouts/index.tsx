import { ReactNode } from "react";

import { useLayout } from "../hooks/useLayout";
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import ColorSwitch from "../components/ColorSwitcher";


const Layout = ({ children }: { children: ReactNode }) => {
    const { layout } = useLayout();

    const layoutClasses: Record<string, string> = {
        primary: "bg-primary-main text-[#FFFFF0]",
        secondary: "bg-secondary-main text-[#6096BA]",
        tertiary: "bg-tertiary-main text-[#7E78D2]",
    };

    return (
        <div className={`${layoutClasses[layout]} min-h-screen flex flex-col group`}>
            <main className="flex-grow">
                {children}
            </main>
            <div className="fixed bottom-4 right-4">
                <ColorSwitch />
            </div>
            <Navbar />
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
};

export default Layout;