import React from 'react'

type ButtonProps = {
    children: any
    [key: string]: any
}

/** Major buttons. */
export const HexButton: React.FC<ButtonProps> = ({ children, className, ...props }) => {
    return (
        <div className={`hexButton unselectable ${className || ''}`} {...props}>
            <div />
            <div>{children}</div>
            <div />
        </div>
    )
}

export const LinkButton: React.FC<ButtonProps> = ({ children, className, ...props }) => {
    return (
        <div className={`linkButton unselectable ${className || ''}`} {...props}>
            <div />
            <div>
                {children}
                <div className="horizSpace" />→
            </div>
            <div />
        </div>
    )
}
