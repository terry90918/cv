export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/\/$/, '')

export const assetPath = (path: string) => `${basePath}${path}`
