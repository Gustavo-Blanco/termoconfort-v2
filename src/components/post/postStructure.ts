import { PostCardReq } from '../../response/PostCardReq';

export interface IPostSearchPage {
    posts: PostCardReq[]
    pages: number;
}