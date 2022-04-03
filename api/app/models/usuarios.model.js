const sql = require("./db.js");

// constructor
const Usuarios = function (tutorial) {
  this.title = tutorial.title;
  this.description = tutorial.description;
  this.published = tutorial.published;
};

Usuarios.create = (newUsuario, result) => {
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

Usuarios.findById = (id, result) => {
  sql.query(`SELECT * FROM empresas_usuarios WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found tutorial: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Usuarios with the id
    result({ kind: "not_found" }, null);
  });
};

Usuarios.getEmailSenha = (login, result) => {

  console.log('LOGIN', login)

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

Usuarios.remove = (id, result) => {
  sql.query("DELETE FROM empresas_usuarios WHERE id = ?", id, (err, res) => {
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

    console.log("deleted tutorial with id: ", id);
    result(null, res);
  });
};

Usuarios.removeAll = result => {
  sql.query("DELETE FROM empresas_usuarios", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} empresas_usuarios`);
    result(null, res);
  });
};

module.exports = Usuarios;
