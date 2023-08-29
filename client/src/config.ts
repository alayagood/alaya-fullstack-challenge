interface IConfig {
    apiUrl: string
}

export const config: IConfig = {
    apiUrl: process.env.REACT_APP_API_URL || ''
}