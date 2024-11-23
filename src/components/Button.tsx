import React, {MouseEvent, ReactElement, ReactNode} from "react";

import { ForthIcon, BackIcon } from "../resources/icons";

interface IButtonProps {
    onClick?: (e: MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
    size?: "btn-xxs" | "btn-xs" | "btn-sm" | "btn-md" | "btn-lg";
    startIcon?: JSX.Element | ReactElement | ReactNode;
    endIcon?: JSX.Element | ReactElement | ReactNode;
    variant?: 'forth' | 'back' | 'default';
    children?: React.ReactNode;
    className?: string;
    border?: string;
    height?: string;
    color?: string;
    width?: string;
    title?: string;
}

const Button: React.FC<IButtonProps> = ({
    variant = 'default',
    onClick,
    className = '',
    children
}) => {
    if (variant === 'forth') {
        return (
            <div 
                onClick={onClick}
                className={`cursor-pointer hover:opacity-75 transition-opacity duration-200 ${className}`}
                role="button"
                tabIndex={0}
            >
                <ForthIcon size={20} />
            </div>
        );
    }

    if (variant === 'back') {
        return (
            <div 
                onClick={onClick}
                className={`cursor-pointer hover:opacity-75 transition-opacity duration-200 ${className}`}
                role="button"
                tabIndex={0}
            >
                <BackIcon size={20} />
            </div>
        );
    }

    // default button case (if needed)
    return (
        <button 
            onClick={onClick}
            className={`flex items-center justify-center px-4 rounded-md transition-opacity duration-200 hover:opacity-75 ${className}`}
        >
            {children}
        </button>
    );
};


export default Button;