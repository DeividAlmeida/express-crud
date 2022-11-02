const { users } = require("./store");

exports.get = (req, res) => { 
  try {
    return res.json(users);
  } catch (error) {
    res.status(500).send(error);
  }
}

exports.post = (req, res) => {
  try {
    const user = newObject({nome, empresa, permissao} = req.body);
    users.push(user);
    return res.json(user);
  } catch (error) {
    res.status(500).send(error);
  }
}

exports.patch = async (req, res) => {
  try {
    const { user } = await filterUsers(req.params.id);
    editObject(user, {nome, empresa, permissao} = req.body);
    return res.json(user);
  } catch (error) {
    res.status(500).send(error);
  }
}

exports.delete = async (req, res) => {
  try {
    const { index } = await filterUsers(req.params.id);
    const removedUser = users.splice(index, 1);
    return res.json(removedUser);
  } catch (error) {
    res.status(500).send(error);
  }
}

const newObject = function ( params ) {
  const id = newId();
  return Object.assign( params,{id: id} );
}

const editObject = function (user, newUser) {
  return Object.assign( user, newUser);
}

const newId = function () {
  return Math.max(...users.map(user => user.id))+1;
}

const filterUsers = async function (id) {
  let index,
    user = await users.filter((userValue, userIndex ) => {
    if(userValue.id == id){
      index = userIndex;
      return true ;
    }
  })[0];
  return { user: user, index: index};
}