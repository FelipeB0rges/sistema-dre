const sql = require("./db.js");

// constructor
const Usuarios = function (usuario) {
  this.id_empresa = usuario.id_empresa;
  this.nome = usuario.nome;
  this.email = usuario.email;
  this.senha = usuario.senha;
  this.cpf = usuario.cpf;
};

Usuarios.create = (novoUsuario, result) => {

  sql.query("INSERT INTO empresas_usuarios SET ?", novoUsuario, (err, res) => {

    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created usuario: ", { id: res.insertId, ...novoUsuario });
    result(null, { id: res.insertId, ...novoUsuario });
  });
};

Usuarios.login = (newUsuario, result) => {
  sql.query("INSERT INTO empresas_usuarios SET ?", newUsuario, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created tutorial: ", { id: res.insertId, ...newUsuario });
    result(null, { id: res.insertId, ...newUsuario });
  });
};

Usuarios.findByIdEmpresa = (id, result) => {
  sql.query(`SELECT * FROM empresas_usuarios WHERE id_empresa = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Usuarios encontrados: ", res[0]);
      result(null, res);
      return;
    }

    // not found Usuarios with the id
    result({ kind: "nenhum_usuario_encontrado" }, null);
  });
};

Usuarios.getEmailSenha = (login, result) => {

  let query = "SELECT * FROM empresas_usuarios";

  if (login) {
    query += ` WHERE email = '${login.email}' AND senha = '${login.senha}'`;
  }

  console.log(query);

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }


    console.log("empresas_usuarios: ", res);
    result(null, res);
  });
};

Usuarios.getAllPublished = result => {
  sql.query("SELECT * FROM empresas_usuarios WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("empresas_usuarios: ", res);
    result(null, res);
  });
};

Usuarios.updateById = (id, tutorial, result) => {
  sql.query(
    "UPDATE empresas_usuarios SET title = ?, description = ?, published = ? WHERE id = ?",
    [tutorial.title, tutorial.description, tutorial.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Usuarios with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated tutorial: ", { id: id, ...tutorial });
      result(null, { id: id, ...tutorial });
    }
  );
};

Usuarios.delete = (id, result) => {
  sql.query("DELETE FROM empresas_usuarios WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Usuarios with the id
      result({ kind: "usuario não encontrado" }, null);
      return;
    }

    console.log("Usuario deletado com o id id: ", id);
    result(null, res);
  });
};


module.exports = Usuarios;
