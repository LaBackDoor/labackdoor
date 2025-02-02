import { clsx } from "clsx";
import { useState } from "react";
import { useLayout } from "../../hooks/useLayout";
import { Link, useLocation, useMatch, useResolvedPath } from "react-router-dom";

import { CONTACT_PAGE, GROUP_PAGE, HOME_PAGE, PROJECTS_PAGE } from "../../resources/paths";
import { MenuIcon, BackIcon } from "../../resources/icons";
import { AboutOverlay } from "../../pages/About";
import Footer from "../Footer";
import Logo from "../Logo";

interface ICustomLinkProps {
    to?: string;
    className?: string;
    onClick?: () => void;
    children: React.ReactNode;
}

interface INavbar {
    className?: string;
    showLogo?: boolean;
}

function CustomLink({ to, children, onClick, className }: ICustomLinkProps) {
    // call hooks at top level, even if their values won't be used
    const resolvedPath = useResolvedPath(to || '/');
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });

    // handle button
    if (!to && onClick) {
        return (
            <li className={clsx("list-none", className)}>
                <button onClick={onClick}>{children}</button>
            </li>
        );
    }

    // handle link
    return (
        <li className={clsx(isActive ? "active" : "", "list-none", className)}>
            <Link to={to!} onClick={onClick}>{children}</Link>
        </li>
    );
}

const Navbar: React.FC<INavbar> = ({
    className = '',
    showLogo = false,
}) => {
    const { layout } = useLayout();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const isGroupPage = location.pathname === '/group';
    const [isAboutOpen, setIsAboutOpen] = useState(false);
    const isProjectsPage = location.pathname === '/projects';

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
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

    const getOverlayBgColor = () => {
        switch (layout) {
            case 'primary':
                return "bg-primary-main";
            case 'secondary':
                return "bg-secondary-main";
            case 'tertiary':
                return "bg-tertiary-main";
            default:
                return "bg-secondary-main";
        }
    };

    const handleNavItemClick = (callback?: () => void) => {
        closeMenu();
        if (callback) {
            callback();
        }
    };

    const toggleAbout = () => {
        setIsAboutOpen(!isAboutOpen);
        document.body.classList.toggle('overflow-hidden');
    };


    const renderGroupPageNav = () => (
        <div className={`hidden md:flex items-start justify-start gap-12 mx-5 mt-0.5 text-sm ${getNavTextStyles()}`}>
            <div className="flex flex-col">
                <p className="font-extralight">
                    Research Lab of <span className="font-bold">
                        <a href="https://www.linkedin.com/in/abaniseorojo/">Abanisenioluwa Orojo</a>
                    </span> & <br />
                    <span className="font-bold">
                        <a href="https://www.linkedin.com/in/webster-elumelu/">Webster Elumelu</a>
                    </span>
                </p>
            </div>

            <div className="flex flex-col ml-2">
                <span>USA</span>
                <span>
                    <a href="mailto:hello@labackdoor.com">hello@labackdoor.com</a>
                </span>
            </div>

            <div className="flex items-center ml-4">
                <Link to={PROJECTS_PAGE} className="hover:opacity-80">
                    projects
                </Link>
            </div>
        </div>
    );

    const renderProjectPageNav = () => (
        <div className={`hidden md:flex items-start justify-start gap-12 mx-5 mt-0.5 text-sm ${getNavTextStyles()}`}>
            <div className="flex flex-col">
                <p className="font-extralight">
                    Research Lab of <span className="font-bold">
                        <a href="https://www.linkedin.com/in/abaniseorojo/">Abanisenioluwa Orojo</a>
                    </span> & <br />
                    <span className="font-bold">
                        <a href="https://www.linkedin.com/in/webster-elumelu/">Webster Elumelu</a>
                    </span>
                </p>
            </div>

            <div className="flex flex-col ml-2">
                <span>USA</span>
                <span>
                    <a href="mailto:hello@labackdoor.com">hello@labackdoor.com</a>
                </span>
            </div>

            <div className="flex items-center ml-4">
                <Link to={GROUP_PAGE} className="hover:opacity-80">
                    group
                </Link>
            </div>
        </div>
    );

    const renderDefaultNav = () => (
        <>
            <div className={`font-drukcond transition-opacity duration-300 ${showLogo ? 'opacity-100' : 'opacity-0'
                }`}>
                <Logo />
            </div>
            <div className={`hidden md:flex items-start justify-start gap-12 mx-5 mt-0.5 text-sm font-extralight ${getNavTextStyles()}`}>
                <div className="flex flex-col">
                    <p>
                        Research Lab of <span className="font-bold">
                            <a href="https://www.linkedin.com/in/abaniseorojo/">Abanisenioluwa Orojo</a>
                        </span> & <br />
                        <span className="font-bold">
                            <a href="https://www.linkedin.com/in/webster-elumelu/">Webster Elumelu</a>
                        </span>
                    </p>
                </div>

                <div className="flex flex-col ml-2 font-normal">
                    <span>USA</span>
                    <span className="font-bold">
                        <a href="mailto:hello@labackdoor.com">hello@labackdoor.com</a>
                    </span>
                </div>

                <div className="grid grid-cols-2 font-bold gap-x-16 gap-y-0.5 ml-4">
                    <CustomLink onClick={() => handleNavItemClick(toggleAbout)}>about</CustomLink>
                    <CustomLink to={PROJECTS_PAGE}>projects</CustomLink>
                    <CustomLink to={GROUP_PAGE}>group</CustomLink>
                    <CustomLink to={CONTACT_PAGE}>contact</CustomLink>
                </div>
            </div>

            {/* Mobile overlay navbar */}
            <div className="md:hidden">
                <button
                    className="fixed z-50 p-2 text-2xl top-4 right-4 focus:outline-none"
                    onClick={toggleMenu}
                >
                    {isOpen ? <BackIcon /> : <MenuIcon />}
                </button>
                <div
                    className={clsx(
                        "fixed top-0 left-0 right-0 bottom-0 flex flex-col items-start justify-between transition-opacity duration-300 ease-in-out md:hidden",
                        isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
                        getOverlayBgColor()
                    )}
                >
                    <div className={`flex flex-col items-start gap-8 px-8 py-12 text-sm font-extralight md:gap-20 md:py-32 ${getNavTextStyles()}`}>
                        <Link to={HOME_PAGE} className="text-2xl font-medium font-drukcond">LABACKDOOR</Link>
                        <div className="flex flex-col items-start gap-6 mt-8">
                            <CustomLink onClick={toggleAbout}>01 About</CustomLink>
                            <CustomLink to={CONTACT_PAGE} onClick={closeMenu}>02 Contact</CustomLink>
                            <CustomLink to={GROUP_PAGE}>03 Group</CustomLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    const renderNavigationContent = () => {
        if (isGroupPage) {
            return renderGroupPageNav();
        }
        if (isProjectsPage) {
            return renderProjectPageNav();
        }
        return renderDefaultNav();
    };

    return (
        <>
            <nav className={`fixed font-akzidenz bottom-0 left-0 z-40 w-full bg-transparent ${className}`}>
                <div className="flex flex-col w-full">
                    {renderNavigationContent()}
                </div>
                <div className="mt-5">
                    <Footer />
                </div>
            </nav>

            <AboutOverlay
                isOpen={isAboutOpen}
                onClose={() => setIsAboutOpen(false)}
            />
        </>
    );
};

export default Navbar;
