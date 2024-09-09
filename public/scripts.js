document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      document.querySelector(".login-container").classList.remove("active");
      document.querySelector(".main-container").classList.add("active");
    } else {
      alert("Invalid credentials");
    }
  });

document
  .getElementById("userForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const nomeUser = document.getElementById("nomeUser").value;
    const departamento = document.getElementById("departamento").value;
    const licenca = document.getElementById("licenca").value;
    const dataCriacao = document.getElementById("dataCriacao").value;
    const fornecedor = document.getElementById("fornecedor").value;
    const valor = document.getElementById("valor").value;
    const cc = document.getElementById("cc").value;

    const response = await fetch("/addUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nomeUser,
        departamento,
        licenca,
        dataCriacao,
        fornecedor,
        valor,
        cc,
      }),
    });

    if (response.ok) {
      loadUsers();
      document.getElementById("userForm").reset();
    } else {
      alert("Failed to add user");
    }
  });

async function loadUsers() {
  const response = await fetch("/getUsers");
  const users = await response.json();
  const tableBody = document.getElementById("userTableBody");
  tableBody.innerHTML = "";
  users.forEach((user) => {
    const newRow = tableBody.insertRow();
    newRow.innerHTML = `
                    <td>${user.nomeUser}</td>
                    <td>${user.departamento}</td>
                    <td>${user.licenca}</td>
                    <td>${user.dataCriacao}</td>
                    <td>${user.fornecedor}</td>
                    <td>${user.valor}</td>
                    <td>${user.cc}</td>
                `;
  });
}

loadUsers();
