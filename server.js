const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const db = require("./database");

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Use 'true' se estiver usando HTTPS
  })
);

// Middleware para verificar se o usuário está logado
function checkAuth(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login.html");
  }
}

// Redirecionar a página inicial para o login
app.get("/", (req, res) => {
  res.redirect("/login.html");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.get(
    "SELECT * FROM analysts WHERE username = ? AND password = ?",
    [username, password],
    (err, row) => {
      if (err) {
        console.error(err.message);
        res.status(500).send({ message: "Erro no servidor" });
      } else if (row) {
        req.session.user = username;
        res.status(200).send({ message: "Login successful" });
      } else {
        res.status(401).send({ message: "Invalid credentials" });
      }
    }
  );
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login.html");
});

app.post("/register", (req, res) => {
  const { username, password, cost_center, secret_code } = req.body;
  if (secret_code !== "TI123doritos") {
    res.status(403).send({ message: "Invalid secret code" });
    return;
  }
  const stmt = db.prepare(
    "INSERT INTO analysts (username, password, cost_center) VALUES (?, ?, ?)"
  );
  stmt.run(username, password, cost_center, function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).send({ message: "Failed to register analyst" });
    } else {
      console.log(`Analyst registered with ID: ${this.lastID}`);
      res.status(200).send({ message: "Analyst registered successfully" });
    }
  });
  stmt.finalize();
});

// Proteger rotas com o middleware checkAuth
app.get("/home.html", checkAuth, (req, res) => {
  res.sendFile(__dirname + "/public/home.html");
});

app.get("/licencas.html", checkAuth, (req, res) => {
  res.sendFile(__dirname + "/public/licencas.html");
});

app.post("/addUser", checkAuth, (req, res) => {
  const {
    nomeUser,
    departamento,
    licenca,
    dataCriacao,
    fornecedor,
    valor,
    cc,
  } = req.body;
  const stmt = db.prepare(
    "INSERT INTO users (nomeUser, departamento, licenca, dataCriacao, fornecedor, valor, cc) VALUES (?, ?, ?, ?, ?, ?, ?)"
  );
  stmt.run(
    nomeUser,
    departamento,
    licenca,
    dataCriacao,
    fornecedor,
    valor,
    cc,
    function (err) {
      if (err) {
        console.error(err.message);
        res.status(500).send({ message: "Failed to add user" });
      } else {
        console.log(`User added with ID: ${this.lastID}`);
        res.status(200).send({ message: "User added successfully" });
      }
    }
  );
  stmt.finalize();
});

app.get("/getUsers", checkAuth, (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send({ message: "Failed to retrieve users" });
    } else {
      res.status(200).send(rows);
    }
  });
});

app.delete("/deleteUser/:id", checkAuth, (req, res) => {
  const userId = req.params.id;
  const stmt = db.prepare("DELETE FROM users WHERE id = ?");
  stmt.run(userId, function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).send({ message: "Failed to delete user" });
    } else {
      console.log(`User deleted with ID: ${userId}`);
      res.status(200).send({ message: "User deleted successfully" });
    }
  });
  stmt.finalize();
});

app.put("/updateUser/:id", checkAuth, (req, res) => {
  const userId = req.params.id;
  const {
    nomeUser,
    departamento,
    licenca,
    dataCriacao,
    fornecedor,
    valor,
    cc,
  } = req.body;
  const stmt = db.prepare(
    "UPDATE users SET nomeUser = ?, departamento = ?, licenca = ?, dataCriacao = ?, fornecedor = ?, valor = ?, cc = ? WHERE id = ?"
  );
  stmt.run(
    nomeUser,
    departamento,
    licenca,
    dataCriacao,
    fornecedor,
    valor,
    cc,
    userId,
    function (err) {
      if (err) {
        console.error(err.message);
        res.status(500).send({ message: "Failed to update user" });
      } else {
        console.log(`User updated with ID: ${userId}`);
        res.status(200).send({ message: "User updated successfully" });
      }
    }
  );
  stmt.finalize();
});

app.get("/getUsername", (req, res) => {
  if (req.session.user) {
    res.status(200).send({ username: req.session.user });
  } else {
    res.status(401).send({ message: "Not logged in" });
  }
});

app.post("/addAditivo", checkAuth, (req, res) => {
  const {
    aditivo,
    patrimonio,
    chamado,
    colaborador,
    email_colaborador,
    rua,
    numero,
    bairro,
    estado,
    cidade,
    responsavel,
    tipo,
    modelo,
    armazenamento,
    processador,
    memoria_ram,
    placa_video,
    fonte,
    numero_nf,
    cnpj,
    centro_custos,
    numero_serie,
    inicio_contrato,
    observacao_pedido,
  } = req.body;

  const stmt = db.prepare(`INSERT INTO aditivos (
      aditivo, patrimonio, chamado, colaborador, email_colaborador, rua, numero,
      bairro, estado, cidade, responsavel, tipo, modelo, armazenamento, processador,
      memoria_ram, placa_video, fonte, numero_nf, cnpj, centro_custos, numero_serie,
      inicio_contrato, observacao_pedido
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

  stmt.run(
    aditivo,
    patrimonio,
    chamado,
    colaborador,
    email_colaborador,
    rua,
    numero,
    bairro,
    estado,
    cidade,
    responsavel,
    tipo,
    modelo,
    armazenamento,
    processador,
    memoria_ram,
    placa_video,
    fonte,
    numero_nf,
    cnpj,
    centro_custos,
    numero_serie,
    inicio_contrato,
    observacao_pedido,
    function (err) {
      if (err) {
        console.error(err.message);
        res.status(500).send({ message: "Failed to add aditivo" });
      } else {
        console.log(`Aditivo added with ID: ${this.lastID}`);
        res.status(200).send({ message: "Aditivo added successfully" });
      }
    }
  );
  stmt.finalize();
});

app.get("/getAditivos", checkAuth, (req, res) => {
  db.all("SELECT * FROM aditivos", [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send({ message: "Failed to retrieve aditivos" });
    } else {
      res.status(200).send(rows);
    }
  });
});

app.get("/getAditivo/:id", checkAuth, (req, res) => {
  const aditivoId = req.params.id;
  db.get("SELECT * FROM aditivos WHERE id = ?", [aditivoId], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).send({ message: "Failed to retrieve aditivo" });
    } else {
      res.status(200).send(row);
    }
  });
});

app.put("/updateAditivo/:id", checkAuth, (req, res) => {
  const aditivoId = req.params.id;
  const {
    aditivo,
    patrimonio,
    chamado,
    colaborador,
    email_colaborador,
    rua,
    numero,
    bairro,
    estado,
    cidade,
    responsavel,
    tipo,
    modelo,
    armazenamento,
    processador,
    memoria_ram,
    placa_video,
    fonte,
    numero_nf,
    cnpj,
    centro_custos,
    numero_serie,
    inicio_contrato,
    observacao_pedido,
  } = req.body;

  const stmt = db.prepare(
    "UPDATE aditivos SET aditivo = ?, patrimonio = ?, chamado = ?, colaborador = ?, email_colaborador = ?, rua = ?, numero = ?, bairro = ?, estado = ?, cidade = ?, responsavel = ?, tipo = ?, modelo = ?, armazenamento = ?, processador = ?, memoria_ram = ?, placa_video = ?, fonte = ?, numero_nf = ?, cnpj = ?, centro_custos = ?, numero_serie = ?, inicio_contrato = ?, observacao_pedido = ? WHERE id = ?"
  );
  stmt.run(
    aditivo,
    patrimonio,
    chamado,
    colaborador,
    email_colaborador,
    rua,
    numero,
    bairro,
    estado,
    cidade,
    responsavel,
    tipo,
    modelo,
    armazenamento,
    processador,
    memoria_ram,
    placa_video,
    fonte,
    numero_nf,
    cnpj,
    centro_custos,
    numero_serie,
    inicio_contrato,
    observacao_pedido,
    aditivoId,
    function (err) {
      if (err) {
        console.error(err.message);
        res.status(500).send({ message: "Failed to update aditivo" });
      } else {
        console.log(`Aditivo updated with ID: ${aditivoId}`);
        res.status(200).send({ message: "Aditivo updated successfully" });
      }
    }
  );
  stmt.finalize();
});

app.delete("/deleteAditivo/:id", checkAuth, (req, res) => {
  const aditivoId = req.params.id;
  const stmt = db.prepare("DELETE FROM aditivos WHERE id = ?");
  stmt.run(aditivoId, function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).send({ message: "Failed to delete aditivo" });
    } else {
      console.log(`Aditivo deleted with ID: ${aditivoId}`);
      res.status(200).send({ message: "Aditivo deleted successfully" });
    }
  });
  stmt.finalize();
});

async function getLicencasPorCategoria() {
  const sql = "SELECT licenca, COUNT(*) as count FROM users GROUP BY licenca";
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        const result = {};
        rows.forEach((row) => {
          result[row.licenca] = row.count;
        });
        resolve(result);
      }
    });
  });
}

async function getLicencasPorDataCriacao() {
  const sql =
    "SELECT dataCriacao, COUNT(*) as count FROM users GROUP BY dataCriacao";
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        const result = {};
        rows.forEach((row) => {
          result[row.dataCriacao] = row.count;
        });
        resolve(result);
      }
    });
  });
}

async function getLicencasPorDepartamento() {
  const sql =
    "SELECT departamento, COUNT(*) as count FROM users GROUP BY departamento";
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        const result = {};
        rows.forEach((row) => {
          result[row.departamento] = row.count;
        });
        resolve(result);
      }
    });
  });
}

app.get("/getDashboardData", checkAuth, async (req, res) => {
  try {
    const categorias = await getLicencasPorCategoria();
    const dataCriacao = await getLicencasPorDataCriacao();
    const departamento = await getLicencasPorDepartamento();

    res.json({
      categorias,
      dataCriacao,
      departamento,
    });
  } catch (error) {
    console.error("Erro ao carregar os dados do dashboard:", error);
    res.status(500).json({ error: "Erro ao carregar os dados do dashboard" });
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
    } else {
      res.redirect("/");
    }
  });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
