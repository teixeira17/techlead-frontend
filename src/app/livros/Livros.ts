
export class Livros{
    id: number;
    nome: string;
    autor: number;
    date: Date;
}

export class Content{
    content: Array<Livros>;
}