const { users } = require("./store");

exports.isAdmin = async (req, res, next) => {
  const { calledId } = req.params;
  const userAdmin = await users.find(user => user.id == calledId && user.permissao === "ADMIN");
  if(!userAdmin) return res.status(401).send("Unauthorized");
  next();
}

exports.isValidId = async (req, res, next) => {
  const { id } = req.params;
  const userExist = await users.find(user => user.id == id);
  if(!userExist) return res.status(400).send("bad request");
  next();
}

exports.hasValidParams = function (req, res, next) {
  if (!req.body.nome || !req.body.empresa || !req.body.permissao)
    return res.status(400).send("bad request");
  next();
}