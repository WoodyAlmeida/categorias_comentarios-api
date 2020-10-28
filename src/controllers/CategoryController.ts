import { Request, Response } from 'express';
import * as Yup from 'yup';
import CategoryRepo from '../repositories/categoryRepo';

export default class CategoryController {

    //a partir do nome e cor cria uma categoria
    static async newCategory(req: Request, res: Response){
        try{
            let { body } = req;
            //conferindo objeto vindo do request, cor não é obrigatória,
            //nome de categoria é exigido e deve ter ao menos 3 caracteres
            const schema = Yup.object().shape({
                name: Yup.string().required('NO_CATEGORY_NAME').min(3, 'INVALID_CATEGORY_NAME'),
                color: Yup.string().notRequired(),
            });
            //caso os dados não sejam válidos de acordo com o modelo acima
            //o erro é retornado
            if (!(await schema.isValid(req.body))) {
                return res.status(400).json({ error: 'Erro de validação'});
            }
            let user = CategoryRepo.createNewCategory(body);
            return res.status(200).json({ success: true, user });
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
    }

    //se a categoria existe retorna suas infos com base no id
    static async getCategory(req: Request, res: Response){
        try{
            const { id } = req.params;
            let category = CategoryRepo.getCategory(id);
            if(category)
                return res.status(200).json({ success: true, category });
            else return res.status(404).json({ success: false, message: "Categoria não encontrada!"});
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
    }

    //retorna em array todas as categorias
    static async allCategories(req: Request, res: Response){
        try{
            let categories = CategoryRepo.allCategories();
                return res.status(200).json({ success: true, categories });
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
    }

    //deleta categoria com base no id
    static async delCategory(req: Request, res: Response){
        try{
            //como a aplicação não possui login nem permissões, token não é conferido
            const { id } = req.params;
            let category = CategoryRepo.getCategory(id);
            if(category){
                let name = category.name;
                CategoryRepo.delCategory(id);
                return res.status(200).json({ success: true, message: `${name} foi deletada!` });
            }
            else return res.status(404).json({ success: false, message: "Categoria não encontrada!"});
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
    }
}