/**
 * Similar to a `Record<K, V>`, but allows optional keys.
 *
 * Note: While `Record<K, V>[K]` is basically equal to `V`, the type `Dictionary<K, V>[K]` is equal to `V | undefined`.
 */
export type Dictionary<K extends keyof any, V> = { [k in K]?: V }
