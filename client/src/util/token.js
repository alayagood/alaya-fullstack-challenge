
export const setToken = (value) => {
    const expires = new Date(Date.now() + 864e5).toUTCString()
    document.cookie = 'token=' + encodeURIComponent(value) + ';expires=' + expires + '; path=/'
}

export const getToken = () => {
    return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=')
        return parts[0] === "token" ? decodeURIComponent(parts[1]) : r
    }, '')
}

export const resetToken = () => {
    document.cookie='token=;expires=-1;path=/'
}