export const GRID_SIZE = 70
export const GRID_LINE_WIDTH = 5

const DEBUG = true

export function isDebug() {
    return window.debug === true || DEBUG
}