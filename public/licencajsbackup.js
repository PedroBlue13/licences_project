document
  .getElementById("userForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const nomeUser = document.getElementById("nomeUser").value;
    const departamento = document.getElementById("departamento").value;
    const licenca = document.getElementById("licenca").value;
    const dataCriacao =
      document.getElementById("dataCriacao").value || "Dado não preenchido";
    const fornecedor = document.getElementById("fornecedor").value;
    const valor = parseFloat(document.getElementById("valor").value) || 0.0;
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

let users = [];

async function loadUsers() {
  const response = await fetch("/getUsers");
  users = await response.json();
  displayUsers(users);
}

function displayUsers(users) {
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
            <td><button onclick="openEditModal(${user.id})">Editar</button></td>
        `;
  });
}

function filterUsers() {
  const filterNomeUser = document
    .getElementById("filterNomeUser")
    .value.toLowerCase();
  const filterDepartamento = document
    .getElementById("filterDepartamento")
    .value.toLowerCase();
  const filterLicenca = document
    .getElementById("filterLicenca")
    .value.toLowerCase();

  const filteredUsers = users.filter((user) => {
    return (
      user.nomeUser.toLowerCase().includes(filterNomeUser) &&
      user.departamento.toLowerCase().includes(filterDepartamento) &&
      user.licenca.toLowerCase().includes(filterLicenca)
    );
  });

  displayUsers(filteredUsers);
}

function clearFilters() {
  document.getElementById("filterNomeUser").value = "";
  document.getElementById("filterDepartamento").value = "";
  document.getElementById("filterLicenca").value = "";
  displayUsers(users);
}

async function deleteUser(id) {
  if (confirm("Tem certeza que deseja deletar este usuário?")) {
    const response = await fetch(`/deleteUser/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      loadUsers();
      closeModal();
    } else {
      alert("Falha ao excluir usuário");
    }
  }
}

function openEditModal(id) {
  const user = users.find((user) => user.id === id);
  if (!user) return;

  document.getElementById("editUserId").value = user.id;
  document.getElementById("editNomeUser").value = user.nomeUser;
  document.getElementById("editDepartamento").value = user.departamento;
  document.getElementById("editLicenca").value = user.licenca;
  document.getElementById("editDataCriacao").value =
    user.dataCriacao !== "Dado não preenchido" ? user.dataCriacao : "";
  document.getElementById("editFornecedor").value = user.fornecedor;
  document.getElementById("editValor").value =
    user.valor !== 0.0 ? user.valor : "";
  document.getElementById("editCC").value = user.cc;

  document.getElementById("userModal").style.display = "block";
}

document
  .getElementById("editUserForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const id = document.getElementById("editUserId").value;
    const nomeUser = document.getElementById("editNomeUser").value;
    const departamento = document.getElementById("editDepartamento").value;
    const licenca = document.getElementById("editLicenca").value;
    const dataCriacao =
      document.getElementById("editDataCriacao").value || "Dado não preenchido";
    const fornecedor = document.getElementById("editFornecedor").value;
    const valor = parseFloat(document.getElementById("editValor").value) || 0.0;
    const cc = document.getElementById("editCC").value;

    const response = await fetch(`/updateUser/${id}`, {
      method: "PUT",
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
      closeModal();
    } else {
      alert("Falha ao atualizar usuário");
    }
  });

function closeModal() {
  document.getElementById("userModal").style.display = "none";
}

document.querySelector(".close").addEventListener("click", closeModal);

window.addEventListener("click", function (event) {
  if (event.target == document.getElementById("userModal")) {
    closeModal();
  }
});

document
  .getElementById("deleteUserButton")
  .addEventListener("click", function () {
    const id = document.getElementById("editUserId").value;
    deleteUser(id);
  });

document
  .getElementById("filterNomeUser")
  .addEventListener("input", filterUsers);
document
  .getElementById("filterDepartamento")
  .addEventListener("input", filterUsers);
document.getElementById("filterLicenca").addEventListener("input", filterUsers);

loadUsers();
