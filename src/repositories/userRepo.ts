import Dictionary from '../components/dictionary';
import { IUsuario } from '../interfaces/index';

export default class UserRepo {
    //instancia um dicionário de dados baseado na interface IUsuario
    private static states: Dictionary<IUsuario> = new Dictionary();

    //com base num elemento validado no controller cria uma nova entrada no dicionário com um id incremental
    static createNewUser(element: any) {
        let id = this.states.getNextId();
        element['id'] = id;
        this.states.add(Number(id), element);
        return this.states.get(id);
    }

    //retorna um usuário específico com base no id
    static getUser(id: number){
        let users = this.states.toArray();
        let findElement = users.find(u => u.id == id);
        return findElement;
    }

    //deleta um usuário com base no id
    static delUser(id: number){
        this.states.remove(id);
    }

    //retorna numa array todos as categorias
    static allUsers(){
        return this.states.toArray();
    }

}