import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { BackIcon, CloseIcon, MenuIcon } from "../../resources/icons";
import { GROUP_PAGE, PROJECTS_PAGE } from "../../resources/paths";
import { useLayout } from "../../hooks/useLayout";
import { AboutOverlay } from "../../pages/About";
import Logo from "../Logo";


interface INavbar2 {
    className?: string;
}

export const Navbar2: React.FC<INavbar2> = ({
    className = '',
}) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isAboutOpen, setIsAboutOpen] = useState(false)
    const { layout } = useLayout()
    const location = useLocation()

    const getBgColor = () => {
        switch (layout) {
            case 'primary':
                return 'bg-primary-main/95';
            case 'secondary':
                return 'bg-secondary-main/95';
            case 'tertiary':
                return 'bg-tertiary-main/95';
            default:
                return 'bg-primary-main/95';
        }
    };

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

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        document.body.classList.toggle('overflow-hidden');
    }

    const getSecondNavItem = () => {
        const currentPath = location.pathname;

        if (currentPath === GROUP_PAGE) {
            return (
                <span className="hover:opacity-80 font-bold">
                    02 &nbsp; group
                </span>
            );
        } else if (currentPath === PROJECTS_PAGE) {
            return (
                <span className="hover:opacity-80 font-bold">
                    02 &nbsp; projects
                </span>
            )
        }

        return (
            <Link to={GROUP_PAGE} className="hover:opacity-80 font-bold">
                02 &nbsp; {currentPath === PROJECTS_PAGE ? 'projects' : 'group'}
            </Link>
        );
    };

    return (
        <>
            <nav className={`fixed backdrop-blur-sm top-0 left-0 w-full bg-transparent z-50 py-2 ${className}`}>
                <div className="flex justify-between items-center mx-3 md:mx-5">
                    <div className="flex items-center md:gap-28 gap-4">
                        {/* Menu Toggle Button */}
                        <button
                            onClick={toggleMobileMenu}
                            className="md:hidden p-2"
                            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                        >
                            <MenuIcon className={`w-6 h-6 ${getNavTextStyles()}`} />
                        </button>

                        <div className="font-drukcond">
                            <Logo />
                        </div>

                        {/* Desktop Navigation */}
                        <div className={`hidden md:grid gap-1 font-normal text-sm ${getNavTextStyles()}`}>
                            <button
                                onClick={toggleAbout}
                                className="hover:opacity-80 font-bold"
                            >
                                01 &nbsp; about
                            </button>
                            {getSecondNavItem()}
                        </div>
                    </div>

                    <div>
                        <Link to="/" className="hover:opacity-80 px-4 md:px-14">
                            <BackIcon className="w-6 h-6" />
                        </Link>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isMobileMenuOpen && (
                    <div className={`md:hidden fixed inset-0 top-0 ${getBgColor()} z-40`}>
                        <div className="flex flex-col h-full">
                            <div className="flex justify-end p-4">
                                <button
                                    onClick={toggleMobileMenu}
                                    className="p-2"
                                    aria-label="Close menu"
                                >
                                    <CloseIcon className={`w-6 h-6 ${getNavTextStyles()}`} />
                                </button>
                            </div>
                            
                            <div className="flex flex-row items-center px-8 py-2 text-lg">
                                <div className="flex flex-row items-center gap-6">
                                    <button
                                        onClick={() => {
                                            toggleMobileMenu();
                                            toggleAbout();
                                        }}
                                        className="hover:opacity-80 font-bold"
                                    >
                                        01 &nbsp; about
                                    </button>
                                    <div onClick={toggleMobileMenu}>
                                        {getSecondNavItem()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            <AboutOverlay
                isOpen={isAboutOpen}
                onClose={() => {
                    setIsAboutOpen(false);
                    setIsMobileMenuOpen(false);
                }}
            />
        </>
    );
};