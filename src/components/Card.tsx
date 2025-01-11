import React from 'react'
import clsx from "clsx";


interface ICardProps{
  children?: JSX.Element | React.ReactElement | React.ReactNode;
  onClick?: () => void;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" 
    | "3xl" | "4xl"| "5xl" | "6xl" | "7xl" 
    | "screen-xl" | "screen-2xl" | "fullscreen";
  color?: "primary" | "secondary" ;
  fullWidth?: boolean;
  className?: string
}

export function Card ({
  children,
  onClick,
  fullWidth = true,
  color = "secondary",
  className
} : ICardProps) {
  return (
    <div 
      className={clsx(
        "rounded-3xl overflow-hidden text-white",
        fullWidth ? "w-full" : "w-fit",
        {"bg-secondary-main text-white": color == "secondary"},
        {"bg-primary-main text-white": color == "primary"},
        className
      )}
      onClick={onClick}
    >
      { children }
    </div>
  )
}

export default Card;