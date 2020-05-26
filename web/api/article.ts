import CommonAPI from './common';
export class ArticleAPI extends CommonAPI  {
    // protected prefix = '/categories'
    constructor() {
        super('/articles');
    }
}
const MyArticleApi = new ArticleAPI()
export default MyArticleApi