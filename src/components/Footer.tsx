import { clsx } from "clsx";


interface IFooter {
    className?: string,
}

const Footer: React.FC<IFooter> = ({
    className = ''
}) => {
    return (
        <div className={`fixed bottom-0 bg-inherit font-akzidenz left-0 w-full pb-1 z-30 transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${className}`}>
            <div className="flex flex-row justify-between mx-5">
                <footer className={clsx("font-thin text-xxs")}>
                    Copyright © 2024 LaBackDoor. All rights reserved.
                </footer>
            </div>
        </div>
    );
}

export default Footer;