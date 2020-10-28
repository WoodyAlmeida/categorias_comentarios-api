import { Request, Response } from 'express';
import * as Yup from 'yup';
import CommentRepo from '../repositories/commentRepo';

export default class CommentController {

    //a partir do comentário, horário de comentário e ids de usuário e categoria,
    //cria um comentário
    static async newComment(req: Request, res: Response){
        try{
            let { body } = req;

            const schema = Yup.object().shape({
                userId: Yup.number().required(),
                categoryId: Yup.number().required(),
                comment: Yup.string().required(),
                dateTime: Yup.string().required(),
            });
            //caso os dados não sejam válidos de acordo com o modelo acima 
            //o erro é retornado
            if (!(await schema.isValid(req.body))) {
                return res.status(400).json({ error: 'Erro de validação'});
            }
            let comment = CommentRepo.createNewComment(body);
            if(comment)
                return res.status(200).json({ success: true, comment });
            else return res.status(400).json({ success: false, message: "Usuário ou categoria do comentário não existe!" });
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
    }

    //se o comentário existe retorna sua info com base no id
    static async getComment(req: Request, res: Response){
        try{
            const { id } = req.params;
            let comment = CommentRepo.getComment(id);
            if(comment)
                return res.status(200).json({ success: true, comment });
            else return res.status(404).json({ success: false, message: "Comentário não encontrado!"});
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
    }

    //retorna todos os comentários de determinado usuário, caso ele exista
    static async commentsByUser(req: Request, res: Response){
        try{
            const { user_id } = req.params;
            let comments = CommentRepo.allCommentsByUser(user_id);
            if (comments)
                return res.status(200).json({ success: true, comments });
            else return res.status(404).json({ success: false, message: "Usuário não encontrado!"});
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
    }

    //retorna todos os comentários de determinada categoria, caso ela exista
    static async commentsOnCategory(req: Request, res: Response){
        try{
            const { category_id } = req.params;
            let comments = CommentRepo.allCommentsOnCategory(category_id);
            if (comments)
                return res.status(200).json({ success: true, comments });
            else return res.status(404).json({ success: false, message: "Categoria não encontrada!"});
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
    }

    //deleta comentário com base no id
    static async delComment(req: Request, res: Response){
        try{
            const { id } = req.params;
            let comment = CommentRepo.getComment(id);
            if(comment){
                CommentRepo.delComment(id);
                return res.status(200).json({ success: true, message: `Comentário foi deletado!` });
            }
            else return res.status(404).json({ success: false, message: "Comentário não encontrado!"});
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
    }
}