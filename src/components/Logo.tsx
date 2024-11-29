import { Link } from "react-router-dom";

import { useLayout } from "../hooks/useLayout";

const Logo = () => {

    const { layout } = useLayout();

    const getLogoStyles = () => {
        const baseStyles = "text-8xl font-drukcond font-black transition-colors relative duration-300";

        switch (layout) {
            case 'primary':
                return `${baseStyles} text-[#C2A87A] hover:logo-outline-secondary`;
            case 'secondary':
                return `${baseStyles} text-[#8B8C89] hover:logo-outline-primary`;
            case 'tertiary':
                return `${baseStyles} text-[#DDCECD] hover:logo-outline-tertiary`;
            default:
                return `${baseStyles} text-[#8B8C89]`;
        }
    };


    return (
        <div className="flex justify-start mx-5">
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