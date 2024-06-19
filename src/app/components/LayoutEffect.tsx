'use client'
import React, { cloneElement, useRef } from "react";
import { useInView } from "framer-motion";

interface LayoutEffectProps {
    children: React.ReactElement;
    className?: string;
    isInviewState: {
        trueState?: string;
        falseState?: string;
    };
}

const LayoutEffect: React.FC<LayoutEffectProps> = ({
    children,
    className,
    isInviewState: { trueState = "", falseState = "" }
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return cloneElement(children, {
        ref,
        className: `${children.props.className || ""} ${className || ""} ${
            isInView ? trueState : falseState
        }`
    });
};

export default LayoutEffect;
