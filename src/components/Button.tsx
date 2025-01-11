import React, { MouseEvent, ReactElement, ReactNode } from "react";

import { ForthIcon, CloseIcon, BackIcon } from "../resources/icons";

interface IButtonProps {
    variant?: 'forth' | 'back' | 'close' | 'default' | 'ghost' | 'outline' | 'solid' | 'rounded';
    onClick?: (e: MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
    size?: "btn-xxs" | "btn-xs" | "btn-sm" | "btn-md" | "btn-lg";
    startIcon?: JSX.Element | ReactElement | ReactNode;
    endIcon?: JSX.Element | ReactElement | ReactNode;
    children?: React.ReactNode;
    titleClass?: string;
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
    children,
    startIcon,
    endIcon,
    title,
    titleClass
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

    if (variant === 'close') {
        return (
            <div
                onClick={onClick}
                className={`cursor-pointer hover:opacity-75 transition-opacity duration-200 ${className}`}
                role="button"
                tabIndex={0}
            >
                <CloseIcon size={20} />
            </div>
        )
    }

    // default button case (if needed)
    return (
        <button
        onClick={onClick}
        className={`flex items-center justify-center px-4 rounded-md transition-opacity duration-200 hover:opacity-75 ${className}`}
    >
        {startIcon && <span className="mr-2">{startIcon}</span>}
        {title && <span className={titleClass}>{title}</span>}
        {endIcon && <span className="ml-2">{endIcon}</span>}
    </button>
    );
};


export default Button;