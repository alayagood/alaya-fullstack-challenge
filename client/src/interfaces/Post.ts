interface postby {
    _id: string;
    name: string;
}

export interface IPost {
    by: postby,
    title: string,
    content: string,
    slug?: string,
    cuid?: string,
}