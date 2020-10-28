import Dictionary from '../components/dictionary';
import { ICategoria } from '../interfaces/index';

export default class CategoryRepo {
    //instancia um dicionário de dados baseado na interface ICategoria
    private static states: Dictionary<ICategoria> = new Dictionary();

    //com base num elemento validado no controller cria uma nova entrada no dicionário com um id incremental
    static createNewCategory(element: any) {
        let id = this.states.getNextId();
        element['id'] = id;
        this.states.add(Number(id), element);
        return this.states.get(id);
    }

    //retorna uma categoria específica com base no id
    static getCategory(id: number){
        let categories = this.states.toArray();
        let findElement = categories.find(c => c.id == id);
        return findElement;
    }

    //deleta uma categoria com base no id
    static delCategory(id: number){
        this.states.remove(id);
    }

    //retorna numa array todas as categorias
    static allCategories(){
        return this.states.toArray();
    }

}