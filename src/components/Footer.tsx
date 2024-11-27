import { clsx } from "clsx";


function Footer() {
    return (
        <div className="w-full transition-opacity duration-300 opacity-0 group-hover:opacity-100">
            <div className="flex flex-row justify-between mx-5 mt-5">
                <footer className={clsx("font-thin text-xxs")}>
                    Copyright © 2024 LaBackDoor. All rights reserved.
                </footer>
            </div>
        </div>
    );
}

export default Footer;