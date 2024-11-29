import { clsx } from "clsx";
import { useLayout } from "../hooks/useLayout";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

import Footer from "../components/Footer";
import Logo from "./Logo";


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


    return (
        <nav className={`fixed font-akzidenz bottom-0 left-0 z-40 w-full bg-transparent ${className}`}>
            <div className="flex flex-col w-full">

                {/* Top section with logo */}
                <Logo />

                {/* Bottom section with evenly spaced items */}
                <div className={`flex items-start justify-start gap-12 mx-5 mt-[0.5] text-sm font-extralight ${getNavTextStyles()}`}>
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
                <div className="mt-5">
                    <Footer />
                </div>
            </div>
        </nav>
    )
}

export default Navbar;

