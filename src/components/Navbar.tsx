

function Navbar() {
    // const [isOpen, setIsOpen] = useState(false);

    // const toggleNavbar = () => {
    //     setIsOpen(!isOpen)
    // }

    // useEffect(() => {
    //     setIsOpen(false);
    // }, []);

    return (
        <nav className="nav ">
            <a href="/">
                <img src="/icons/backdoor.png" height={50} width={50} alt="logo" />
            </a>
            <ul>
                <li>
                    <a href="/About">About</a>
                </li>
                <li>
                    <a href="Contact">Contact</a>
                </li>
                <li>
                    <a href="Group">Group</a>
                </li>
                <li>
                    <a href="Projects">Projects</a>
                </li>

            </ul>
        </nav>
    )
}

export default Navbar;
