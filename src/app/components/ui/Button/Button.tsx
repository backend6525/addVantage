import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
    <button
        role="button"
        {...props}
        className={`${props.className || ""} px-4 py-2.5 font-medium text-sm text-center duration-150`}
    >
        {children}
    </button>
);

export default Button;
