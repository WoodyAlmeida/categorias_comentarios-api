import Dictionary from '../components/dictionary';
import { IComentario } from '../interfaces/index';
import UserRepo from '../repositories/userRepo';
import CategoryRepo from '../repositories/categoryRepo';

export default class CommentRepo {
    //instancia um dicionário de dados baseado na interface IComentario
    private static states: Dictionary<IComentario> = new Dictionary();

    //com base num elemento validado no controller cria uma nova entrada no dicionário com um id incremental
    static createNewComment(element: any) {
        let id = this.states.getNextId();
        element['id'] = id;
        let user = UserRepo.getUser(element.userId);
        let category = CategoryRepo.getCategory(element.categoryId);
        if(user && category){
            this.states.add(Number(id), element);
            return this.states.get(id);
        } else return false;
    }

    //retorna um comentário específico com base no id
    static getComment(id: number){
        let comments = this.states.toArray();
        let findElement = comments.find(c => c.id == id);
        return findElement;
    }

    //deleta um comentário com base no id
    static delComment(id: number){
        this.states.remove(id);
    }

    //retorna todos os comentários de determinada categoria
    //com base no categoryId dos comentários 
    static allCommentsOnCategory(idCategory: number){
        let category = CategoryRepo.getCategory(idCategory);
        if(category){
            let comments = this.states.toArray();
            let commentsOnCategory = comments.filter(function(comment){ return comment.categoryId==idCategory});
            return commentsOnCategory;
        } else return false;
    }

    //retorna todos os comentários de determinado usuário
    //com base no userId dos comentários
    static allCommentsByUser(idUser: string){
        let id = Number(idUser);
        let user = UserRepo.getUser(id);
        if(user){
            let comments = this.states.toArray();
            let commentsByUser = comments.filter(function(comment){ return comment.userId==idUser});
            return commentsByUser;
        } else return false;
    }
}