export interface Livro{
    codI? : Number,
    titulo : String,
    editora: String,
    edicao: Number,
    anoPublicacao: Number,
    mediaPrecoStr: String
    autores: [{id?:Number, nome: String}],
    assunto: {id?: Number, descricao?: String} | null
}
