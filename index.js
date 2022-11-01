const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

let users = [
  {
    id: 32165,
    nome: "Lucas",
    empresa: "Keller Williams",
    permissao: "ADMIN",
  },
  {
    id: 14564,
    nome: "Aline",
    empresa: "Keller Williams",
    permissao: "USER",
  },
  {
    id: 22314,
    nome: "Bruno",
    empresa: "Keller Williams",
    permissao: "USER",
  },
];

async function isAdmin(req, res, next) {
  let { calledId } = req.params;
  let userAdmin = await users.find(user => user.id == calledId && user.permissao === "ADMIN");
  if(!userAdmin) return res.status(401).send("Unauthorized");
  next();
}

// ROTAS EXECUTANDO FUNÇÕES CRUD NA ARRAY DE USUÁRIOS, ONDE SOMENTE O ADMINISTRADOR PODE CRIAR OU DELETAR UM USUÁRIO.
// ENVIE A ID DE QUEM ESTÁ ENVIANDO O REQUEST COMO PARÂMETRO NA URL " calledId "
// CRIE AS SEGUINTES ROTAS.

//TODO
// GET /users
// POST /users
// PATCH /users/:id
// DELETE /users/:id


app.get('/users', (req, res) => {
  res.json(users)
})

app.post('/users/:calledId', [isAdmin], (req, res) => {
  const user = newObject({nome, empresa, permissao} = req.body);
  if (validParamsPost(req.body)) return res.status(400).send("bad request");
  users.push(user);
  res.json(user)
})

app.patch('/users/:id/:calledId', async (req, res) => {
  const { user } = await filterUsers(req.params.id);
  editObject(user, {nome, empresa, permissao} = req.body)
  res.json(user);
})

app.delete('/users/:id/:calledId', [isAdmin], async (req, res) => {
  const { index } = await filterUsers(req.params.id);
  const removedUser = deleteUser(index);
  res.json(removedUser);
})

function newObject( params ) {
  const id = newId();
  return Object.assign( params,{id: id} );
}

function editObject(user, newUser) {
  return Object.assign( user, newUser);
}

function newId() {
  return Math.max(...users.map(user => user.id))+1
}

function validParamsPost(params) {
  if (!params.nome || !params.empresa || !params.permissao) 
    return true;
  return false;
}

async function filterUsers(id) {
  let index,
    user = await users.filter((userValue, userIndex ) => {
    if(userValue.id == id){
      index = userIndex;
      return true ;
    }
  })[0];
  return { user: user, index: index};
}

function deleteUser(index) {
  return users.splice(index, 1);
}

app.listen(3001);
