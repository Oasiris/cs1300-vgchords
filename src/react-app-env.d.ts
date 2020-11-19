/*
 * Typecasts basic modules.
 */

/// <reference types="react-scripts" />

declare namespace NodeJS {
    interface ProcessEnv {
        REACT_APP_ENV: 'development' | 'production' | 'local'
        PUBLIC_URL: string
    }
}

declare module '*.scss' {
    const content: { [className: string]: string }
    export default content
}

declare module '*.svg' {
    const content: any
    export default content
    const reactComponent: any
    export { reactComponent as ReactComponent }
}
