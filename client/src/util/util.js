import {AppPaths} from "../App";

export const getPostPageUrl = (post) => `${AppPaths.POSTS}/${post.cuid}/${post.slug}`
