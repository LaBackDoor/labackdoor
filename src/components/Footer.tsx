import { clsx } from "clsx";

import { useLayout } from "../hooks/useLayout";


interface IFooter {
    className?: string,
}

const Footer: React.FC<IFooter> = ({
    className = ''
}) => {
    const { layout } = useLayout();
    let currentYear = new Date().getFullYear()

    const getFooterTextStyles = () => {
        switch (layout) {
            case 'primary':
                return "text-[#C2A87A]";
            case 'secondary':
                return "text-[#71717A]";
            case 'tertiary':
                return "text-[#DDCECD]";
            default:
                return "text-[#71717A]";
        }
    };

    return (
        <div className={`fixed bottom-0 bg-inherit font-akzidenz left-0 w-full pb-1 z-30 transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${className}`}>
            <div className="flex flex-row justify-between mx-5">
                <footer className={clsx("font-thin text-xxs", getFooterTextStyles())}>
                    Copyright © {currentYear} LaBackDoor. All rights reserved.
                </footer>
            </div>
        </div>
    );
}

export default Footer;