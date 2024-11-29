import { Link } from "react-router-dom";

import { useLayout } from "../hooks/useLayout";

interface ILogo {
    className?: 'string';
}

const Logo: React.FC<ILogo> = ({
    className = '',
}) => {

    const { layout } = useLayout();

    const getLogoStyles = () => {
        const baseStyles = "text-8xl font-drukcond font-black transition-colors relative duration-300";
        const mobileStyles = "text-5xl";
        // const desktopStyles = "text-8xl";

        switch (layout) {
            case 'primary':
                return `${baseStyles} md:${mobileStyles} text-[#C2A87A] hover:logo-outline-secondary`;
            case 'secondary':
                return `${baseStyles} md:${mobileStyles} text-[#8B8C89] hover:logo-outline-primary`;
            case 'tertiary':
                return `${baseStyles} md:${mobileStyles} text-[#DDCECD] hover:logo-outline-tertiary`;
            default:
                return `${baseStyles} md:${mobileStyles} text-[#8B8C89]`;
        }
    };


    return (
        <div className={`flex justify-start mx-5 ${className}`}>
            <div className="text-left">
                <Link to="/">
                    <p className={getLogoStyles()}>
                        LABACKDOOR
                    </p>
                </Link>
            </div>
        </div>
    )
}

export default Logo;