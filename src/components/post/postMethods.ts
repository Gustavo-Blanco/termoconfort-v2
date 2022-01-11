import { PostCardReq } from '../../response/PostCardReq';
import { getPagination } from './postDao';
import { IPostSearchPage } from './postStructure';

export const formatPagination = async (posts: PostCardReq[], limit: number) => {
    const pages = await getPagination(limit);
    return {
        posts,
        pages
    } as IPostSearchPage
}