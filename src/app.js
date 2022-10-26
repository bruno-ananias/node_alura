import express from "express";

const app = express();

//declarar que o express está usando json. O que chega via json/put, vai ser transformado em objeto.
app.use(express.json());

const livros =[
    {id: 1, "titulo":"Senhos dos Aneis"},
    {id: 2, "titulo":"o Hobbit"}
]

app.get('/', (req, res)=>{
    res.status(200).send('Curso de node')
});
//listar todos
app.get('/livros',(req, res)=>{
    res.status(200).json(livros)
});
//listar um id especifico
app.get('/livros/:id',(req, res)=>{
    //Criar uma variável index, e passar ela pra nossa fnc busca_livros.
    //Essa variável vem da URL
    let index = busca_livro(req.params.id);
    //Abaixo, vamos procurar ela dentro do array de livros e transformar o titulo, com o que vem da url
    res.json(livros[index]);

})
//Cadastrar
app.post('/livros', (req, res)=>{
    livros.push(req.body);
    res.status(201).send('Livro Cadastrado com Sucesso!!')
})
//put = atualizar
app.put('/livros/:id',(req, res)=>{
    //Criar uma variável index, e passar ela pra nossa fnc busca_livros.
    //Essa variável vem da URL
    let index = busca_livro(req.params.id);
    //Abaixo, vamos procurar ela dentro do array de livros e transformar o titulo, com o que vem da url
    livros[index].titulo = req.body.titulo;
    res.json(livros);

})
//Deletar
app.delete('/livros/:id', (req, res)=>{
    let {id} = req.params;
    let index = busca_livro(id);
    livros.splice(index,1)
    res.send(`Livro ${id} removido.`)
})


function busca_livro(id){
    return livros.findIndex(livro => livro.id == id)
}

export default app;