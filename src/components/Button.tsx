import React from 'react'

type ButtonProps = {
    children: any
    [key: string]: any
}

export const HexButton: React.FC<ButtonProps> = ({ children, className, ...props }) => {
    return (
        <div className={`hexButton ${className || ''}`} {...props}>
            <div />
            <div>{children}</div>
            <div />
        </div>
    )
}
