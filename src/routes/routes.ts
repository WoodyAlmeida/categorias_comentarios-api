import {setExternalRoute} from './';
import UserController from '../controllers/UserController';
import CategoryController from '../controllers/CategoryController';
import CommentController from '../controllers/CommentController';

export function setRoutesUp(app: any){

    //rotas para usuários
    setExternalRoute(app, 'post', '/new_user', UserController.newUser, false);
    setExternalRoute(app, 'post', '/new_user_comment', UserController.newUserAndComment, false); //cria usuário e comentário simultaneamente
    setExternalRoute(app, 'get', '/user/:id', UserController.getUser, false);
    setExternalRoute(app, 'get', '/del_user/:id', UserController.delUser, false);
    setExternalRoute(app, 'get', '/all_users/', UserController.allUsers, false);

    //rotas para categorias
    setExternalRoute(app, 'post', '/new_category', CategoryController.newCategory, false);
    setExternalRoute(app, 'get', '/category/:id', CategoryController.getCategory, false);
    setExternalRoute(app, 'get', '/del_category/:id', CategoryController.delCategory, false);
    setExternalRoute(app, 'get', '/all_categories/', CategoryController.allCategories, false);

    //rotas para comentários
    setExternalRoute(app, 'post', '/new_comment', CommentController.newComment, false);
    setExternalRoute(app, 'get', '/comment/:id', CommentController.getComment, false);
    setExternalRoute(app, 'get', '/del_comment/:id', CommentController.delComment, false);
    setExternalRoute(app, 'get', '/comments_user/:user_id', CommentController.commentsByUser, false); //comentários de determinado usuário
    setExternalRoute(app, 'get', '/comments_category/:category_id', CommentController.commentsOnCategory, false); //comentários de determinada categoria

}