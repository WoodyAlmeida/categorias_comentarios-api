export interface IComentario {
    id: number;
    userId: string;
    categoryId: number;
    comment: string;
    dateTime: string;
}

export interface ICategoria {
    id: number;
    name: string;
    color: string;
}

export interface IUsuario {
    id: number;
    name: string;
    icon: string; 
}