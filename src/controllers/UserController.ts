import { Request, Response } from 'express';
import * as Yup from 'yup';
import UserRepo from '../repositories/userRepo';
import CommentRepo from '../repositories/commentRepo';

export default class UserController {

    static async newUser(req: Request, res: Response){ //a partir do nome e número do icon cria um usuário
        try{
            let { body } = req;

            const schema = Yup.object().shape({
                name: Yup.string().required('NO_USERNAME').min(3, 'INVALID_USERNAME'),
                icon: Yup.string().notRequired(),
            });
            //caso os dados não sejam válidos de acordo com o modelo acima 
            //o erro é retornado
            if (!(await schema.isValid(body))) {
                return res.status(400).json({ error: 'Erro de validação'});
            }
            let user = UserRepo.createNewUser(body);
            return res.status(200).json({ success: true, user });
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
    }

    //se o usuário existe retorna suas infos
    static async getUser(req: Request, res: Response){
        try{
            const { id } = req.params;
            let user = UserRepo.getUser(id);
            if(user)
                return res.status(200).json({ success: true, user });
            else return res.status(404).json({ success: false, message: "Usuário não encontrado!"});
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
    }

    //retorna em array todos os usuários
    static async allUsers(req: Request, res: Response){
        try{
            let users = UserRepo.allUsers();
                return res.status(200).json({ success: true, users });
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
    }

    //cria um usuário e um comentário simultaneamente
    static async newUserAndComment(req: Request, res: Response){
        try{
            let { body } = req;

            const schema = Yup.object().shape({
                user: Yup.object().shape({
                    name: Yup.string().required('NO_USERNAME').min(3, 'INVALID_USERNAME'),
                    icon: Yup.string().notRequired(),
                }),
                comment: Yup.object().shape({
                    categoryId: Yup.number().required(),
                    comment: Yup.string().required(),
                    dateTime: Yup.string().required(),
                })
            });
            //caso os dados não sejam válidos de acordo com o modelo acima 
            //o erro é retornado
            if (!(await schema.isValid(body))) {
                return res.status(400).json({ error: 'Erro de validação'});
            }
            let user = UserRepo.createNewUser(body.user);
            if(user){
                let commentBody = body.comment;
                commentBody['userId'] = user.id;
                let comment = CommentRepo.createNewComment(commentBody);
                return res.status(200).json({ success: true, user, comment });
            } else res.status(400).json({ error: 'Erro na criação de usuário'});
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
    }

    //deleta usuário com base no id
    static async delUser(req: Request, res: Response){
        try{
            //como a aplicação não possui login nem permissões, um token não é conferido
            const { id } = req.params;
            let user = UserRepo.getUser(id);
            if(user){
                let name = user.name;
                UserRepo.delUser(id);
                return res.status(200).json({ success: true, message: `${name} foi deletado(a)!` });
            }
            else return res.status(404).json({ success: false, message: "Usuário não encontrado!"});
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
    }
}