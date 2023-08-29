export const excerptCreator = (str: string, len: number): string =>  {
    if (str?.length > len) {
        str = str.substring(0, len) + "...";
    }
    return str;
}