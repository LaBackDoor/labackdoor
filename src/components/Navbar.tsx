import { clsx } from "clsx";
// import { useEffect, useRef, useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

import { useLayout } from "../hooks/useLayout";


{/*
// import { SearchIcon, CloseIcon } from "../resources/icons";
import ColorSwitch from './ColorSwitcher';

// interface ISearchItem {
//     id: number;
//     title: string;
//     category: string;
//     link: string;
// }
*/}

interface ICustomLinkProps {
    to: string;
    children: React.ReactNode;
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

function Navbar() {

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
        <nav className="flex flex-col w-full">
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
            <div className="flex items-center justify-between mx-5 text-xs font-extralight">
                <p className="mt-1">
                    Research Lab of <span className="font-normal"><a href="https://www.linkedin.com/in/abaniseorojo/">Abanisenioluwa Orojo</a></span> & <br /><span className="font-normal"><a href="https://www.linkedin.com/in/webster-elumelu/">Webster Elumelu</a></span>
                </p>
                <div className="font-hairline">
                    <span>Waco, TX</span> <br /> <span className="font-normal"><a href="mailto:hello@labackdoor.com">hello@labackdoor.com</a></span>
                </div>
                {/* <div className="text-xs font-hairline">
                    Waco
                </div> */}
                {/* <div className="text-xs font-hairline">
                    Waco
                </div> */}
                <CustomLink to="/About">About</CustomLink>
                {/* <CustomLink to="/Group">Group</CustomLink> */}
                {/* <CustomLink to="/Projects">Projects</CustomLink> */}
                {/* <CustomLink to="/Contact">Contact</CustomLink> */}
            </div>
        </nav>
    )
}

export default Navbar;





{/*             
<div className="flex-1 max-w-xl mx-4" ref={searchRef}>
    <form onSubmit={handleSearch} className="relative">
        <div className="relative">
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search..."
                className="w-full px-4 py-2 pl-10 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <SearchIcon
                className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                size={18}
            />
            {searchQuery && (
                <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2 hover:text-gray-600"
                >
                    <CloseIcon size={18} />
                </button>
            )}
        </div>
        
        {isSearchFocused && searchQuery && searchResults.length > 0 && (
            <div className="absolute z-50 w-full mt-2 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg max-h-96">
                {searchResults.map((result) => (
                    <button
                        key={result.id}
                        onClick={() => handleResultClick(result.link)}
                        className="flex items-center justify-between w-full px-4 py-3 text-left hover:bg-gray-50 group"
                    >
                        <div>
                            <div className="font-medium text-gray-800 group-hover:text-blue-600">
                                {result.title}
                            </div>
                            <div className="text-sm text-gray-500">
                                {result.category}
                            </div>
                        </div>
                        <span className="text-gray-400 group-hover:text-blue-600">
                            <SearchIcon size={16} />
                        </span>
                    </button>
                ))}
            </div>
        )}

        {isSearchFocused && searchQuery && searchResults.length === 0 && (
            <div className="absolute z-50 w-full p-4 mt-2 text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-lg">
                No results found for "{searchQuery}"
            </div>
        )}
</form>
</div >
        */}