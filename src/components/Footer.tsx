import { clsx } from "clsx";


function Footer() {
    return (
        <div className="flex flex-row justify-between mx-5 mt-5">
            <footer className={clsx("font-thin text-xxs")}>Copyright © 2024 LaBackDoor. All rights reserved.</footer>
        </div>
    );
}

export default Footer;