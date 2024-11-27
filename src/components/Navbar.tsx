import { clsx } from "clsx";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

import { useLayout } from "../hooks/useLayout";


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

    const getLogoSrc = () => {
        switch (layout) {
            case 'primary':
                return '/icons/lbd_olive.svg';
            case 'secondary':
                return '/icons/lbd_snow.svg';
            case 'tertiary':
                return '/icons/lbd_gun.svg';
            default:
                return '/icons/lbd_olive.svg';
        }
    };


    {/*
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [searchResults, setSearchResults] = useState<ISearchItem[]>([]);
    const searchRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    // Sample data - replace with your actual data
        const sampleData: ISearchItem[] = [
        { id: 1, title: "React Development", category: "Projects", link: "/projects/react" },
        { id: 2, title: "Team Members", category: "Group", link: "/group" },
        { id: 3, title: "Contact Information", category: "Contact", link: "/contact" },
        { id: 4, title: "About Us", category: "About", link: "/about" },
        { id: 5, title: "Node.js Backend", category: "Projects", link: "/projects/node" },
        { id: 6, title: "API Documentation", category: "Projects", link: "/projects/api" },
    ];

    // Handle click outside search results
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchFocused(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [sampleData]);

    // Search functionality
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchResults.length > 0) {
            navigate(searchResults[0].link);
            setSearchQuery("");
            setIsSearchFocused(false);
        }
    };

    // Filter results based on search query
    useEffect(() => {
        if (searchQuery.trim() === "") {
            setSearchResults([]);
            return;
        }

        const filtered = sampleData.filter(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filtered);
    }, [sampleData, searchQuery]);

    const clearSearch = () => {
        setSearchQuery("");
        setSearchResults([]);
    };

    // Handle result click
    const handleResultClick = (link: string) => {
        navigate(link);
        setSearchQuery("");
        setIsSearchFocused(false);
        };
    */}

    return (
        <nav className={`fixed font-akzidenz bottom-0 left-0 z-40 w-full bg-transparent ${className}`}>
            <div className="flex flex-col w-full">

                {/* Top section with logo */}
                <div className="flex justify-start mx-5">
                    <div className="text-left">
                        <Link to="/">
                            <img
                                src={getLogoSrc()}
                                height={200}
                                width={200}
                                alt="LABACKDOOR logo"
                                className="mx-auto transition-all duration-300"
                            />
                        </Link>
                    </div>
                </div>

                {/* Bottom section with evenly spaced items */}
                <div className="flex items-start justify-start gap-12 mx-5 mt-2 text-sm font-extralight">
                    <div className="flex flex-col">
                        <p>
                            Research Lab of <span className="font-normal">
                                <a href="https://www.linkedin.com/in/abaniseorojo/">Abanisenioluwa Orojo</a>
                            </span> & <br />
                            <span className="font-normal">
                                <a href="https://www.linkedin.com/in/webster-elumelu/">Webster Elumelu</a>
                            </span>
                        </p>
                    </div>

                    <div className="flex flex-col ml-2 font-hairline">
                        <span>USA</span>
                        <span className="font-normal">
                            <a href="mailto:hello@labackdoor.com">hello@labackdoor.com</a>
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-x-16 gap-y-0.5 ml-4">
                        <CustomLink to="/About">about</CustomLink>
                        <CustomLink to="/Projects">projects</CustomLink>
                        <CustomLink to="/Group">group</CustomLink>
                        <CustomLink to="/Contact">contact</CustomLink>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;