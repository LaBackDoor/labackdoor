import { Link, useLocation } from "react-router-dom";

function Navbar() {

    return (
        <nav className="nav">
            <Link to="/" className="nav-logo">
                <img src="/icons/backdoor.png" height={50} width={50} alt="logo" />
            </Link>
            <ul>
                <CustomLink to="/About">About</CustomLink>
                <CustomLink to="/Group">Group</CustomLink>
                <CustomLink to="/Projects">Projects</CustomLink>
                <CustomLink to="Contact">Contact</CustomLink>
            </ul>
        </nav>
    )
}

export default Navbar;

interface ICustomLinkProps {
    to: string;
    children: React.ReactNode;
}


function CustomLink({ to, children, ...props }: ICustomLinkProps) {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>{children}</Link>
        </li>
    )
}