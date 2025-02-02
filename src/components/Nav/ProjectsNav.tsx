import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { PROJECTS_PAGE } from "../../resources/paths";
import { useLayout } from "../../hooks/useLayout";
import { BackIcon } from "../../resources/icons";
import { AboutOverlay } from "../../pages/About";
import Logo from "../Logo";


interface INavbar3 {
    className?: string;
}

export const Navbar3: React.FC<INavbar3> = ({
    className = '',
}) => {
    const [isAboutOpen, setIsAboutOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const { layout } = useLayout()

    const getNavTextStyles = () => {
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

    const toggleAbout = () => {
        setIsAboutOpen(!isAboutOpen);
        document.body.classList.toggle('overflow-hidden');
    };

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;

            // start fading out the top navbar when we reach 85% scroll
            setIsVisible(scrollPercentage <= 85);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full bg-transparent z-50 py-4 transition-opacity duration-300 ${className} ${isVisible ? 'opacity-100' : 'opacity-0'
                }`}>
                <div className="flex justify-between items-center mx-5">
                    <div className="flex items-center gap-28">
                        <div className="font-drukcond">
                            <Logo />
                        </div>
                        <div className={`flex flex-col gap-1 font-normal text-sm ${getNavTextStyles()}`}>
                            <button
                                onClick={toggleAbout}
                                className="hover:opacity-80 font-bold text-left"
                            >
                                about
                            </button>
                            <Link to={PROJECTS_PAGE} className="hover:opacity-80 font-bold text-left">
                                projects
                            </Link>
                        </div>
                    </div>
                    <div>
                        <Link to="/" className="hover:opacity-80 px-14">
                            <BackIcon className="w-6 h-6" />
                        </Link>
                    </div>

                </div>
            </nav>
            <AboutOverlay
                isOpen={isAboutOpen}
                onClose={() => setIsAboutOpen(false)}
            />
        </>
    );
};
