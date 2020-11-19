export const sleep = (milliseconds: number) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

export function exists<T>(val: T): val is NonNullable<T> {
    return val !== undefined && val !== null
}
