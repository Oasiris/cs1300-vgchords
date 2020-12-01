export const sleep = (milliseconds: number) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

export function exists<T>(val: T): val is NonNullable<T> {
    return val !== undefined && val !== null
}

export function getMinSec(lengthSeconds: number): string {
    return `${Math.floor(lengthSeconds / 60)}:${String(lengthSeconds % 60).padStart(2, '0')}`
}
