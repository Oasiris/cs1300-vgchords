import React from 'react'

type ButtonProps = {
    children?: any
    [otherProps: string]: any
}

/** Major buttons. */
export const HexButton: React.FC<ButtonProps> = ({ children, className, ...props }) => {
    return (
        <div className={`hexButton unselectable ${className || ''}`} {...props}>
            <div /> {/* Left triangle */}
            <div>{children}</div>
            <div /> {/* Right triangle */}
        </div>
    )
}

type MinorButtonProps = {
    children: any
    className?: string
    href?: string
    target?: string
    [otherProps: string]: any
}

export const MinorButton: React.FC<MinorButtonProps> = ({ children, className, href, target, ...props }) => {
    const Wrapper: React.FC<{ children: any }> = ({ children: ch }) =>
        href ? (
            <a href={href} target={target || ''}>
                {ch}
            </a>
        ) : (
            <>{ch}</>
        )
    return (
        <Wrapper>
            <div className={`minorButton growSlight unselectable ${className || ''}`} {...props}>
                <div /> {/* Left triangle */}
                <div>
                    <>
                        {children}
                        <div className="horizSpace" />→
                    </>
                </div>
                <div /> {/* Right triangle */}
            </div>
        </Wrapper>
    )
}
