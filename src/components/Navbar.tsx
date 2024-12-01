
import { clsx } from "clsx";
import { useState } from "react";
import { useLayout } from "../hooks/useLayout";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

import { MenuIcon, BackIcon } from "../resources/icons";
import Footer from "../components/Footer";
import Logo from "./Logo";
import { CONTACT_PAGE } from "../resources/paths";

interface ICustomLinkProps {
    to: string;
    children: React.ReactNode;
}

interface INavbar {
    className?: string;
}

function CustomLink({ to, children, ...props }: ICustomLinkProps) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });

    return (
        <li className={clsx(isActive ? "active" : "", "list-none")}>
            <Link to={to} {...props}>{children}</Link>
        </li>
    )
}

const Navbar: React.FC<INavbar> = ({
    className = '',
}) => {
    const { layout } = useLayout();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
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

    return (
        <nav className={`fixed font-akzidenz bottom-0 left-0 z-40 w-full bg-transparent ${className}`}>
            <div className="flex flex-col w-full">

                {/* Top section with logo */}
                <div className="font-drukcond">
                    <Logo />
                </div>

                {/* Normal screen navbar */}
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
                        <CustomLink to="/About">about</CustomLink>
                        <CustomLink to="/Projects">projects</CustomLink>
                        <CustomLink to="/Group">group</CustomLink>
                        <CustomLink to="/Contact">contact</CustomLink>
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
                </div>
                <div
                    className={clsx(
                        "fixed top-0 left-0 right-0 bottom-0 flex flex-col items-start justify-between transition-opacity duration-300 ease-in-out md:hidden",
                        isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
                        getOverlayBgColor()
                    )}
                >
                    <div className={`flex flex-col items-start gap-8 px-8 py-12 text-sm font-extralight md:gap-20 md:py-32 ${getNavTextStyles()}`}>
                        <Link to="/" className="text-2xl font-medium font-drukcond">LABACKDOOR</Link>
                        <div className="flex flex-col items-start gap-6 mt-8">
                            <CustomLink to="/About">01 About</CustomLink>
                            <CustomLink to={CONTACT_PAGE}>02 Contact</CustomLink>
                            <CustomLink to="/Group">03 Group</CustomLink>
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    <Footer />
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
