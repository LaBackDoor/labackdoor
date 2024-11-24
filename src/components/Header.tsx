import Logo from './Logo';
// import Nav from './Navbar';

const Header = () => {
    return (
        <header className="flex flex-col items-center justify-between px-4 py-2 bg-gray-100 shadow-md md:flex-row">
            <Logo />
            {/* <Nav /> */}
        </header>
    );
};

export default Header;