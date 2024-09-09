document
  .getElementById("aditivoForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const aditivo = document.getElementById("aditivo").value;
    const patrimonio = document.getElementById("patrimonio").value;
    const chamado = document.getElementById("chamado").value;
    const colaborador = document.getElementById("colaborador").value;
    const email_colaborador =
      document.getElementById("email_colaborador").value;
    const rua = document.getElementById("rua").value;
    const numero = document.getElementById("numero").value;
    const bairro = document.getElementById("bairro").value;
    const estado = document.getElementById("estado").value;
    const cidade = document.getElementById("cidade").value;
    const responsavel = document.getElementById("responsavel").value;
    const tipo = document.getElementById("tipo").value;
    const modelo = document.getElementById("modelo").value;
    const armazenamento = document.getElementById("armazenamento").value;
    const processador = document.getElementById("processador").value;
    const memoria_ram = document.getElementById("memoria_ram").value;
    const placa_video = document.getElementById("placa_video").value;
    const fonte = document.getElementById("fonte").value;
    const numero_nf = document.getElementById("numero_nf").value;
    const cnpj = document.getElementById("cnpj").value;
    const centro_custos = document.getElementById("centro_custos").value;
    const numero_serie = document.getElementById("numero_serie").value;
    const inicio_contrato = document.getElementById("inicio_contrato").value;
    const observacao_pedido =
      document.getElementById("observacao_pedido").value;

    const response = await fetch("/addAditivo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
      }),
    });

    if (response.ok) {
      loadAditivos();
      document.getElementById("aditivoForm").reset();
    } else {
      alert("Failed to add aditivo");
    }
  });

let aditivos = [];

async function loadAditivos() {
  const response = await fetch("/getAditivos");
  aditivos = await response.json();
  displayAditivos(aditivos);
}

function displayAditivos(aditivos) {
  const tableBody = document.getElementById("aditivoTableBody");
  tableBody.innerHTML = "";
  aditivos.forEach((aditivo) => {
    const newRow = tableBody.insertRow();
    newRow.innerHTML = `
            <td>${aditivo.aditivo}</td>
            <td>${aditivo.patrimonio}</td>
            <td>${aditivo.chamado}</td>
            <td>${aditivo.colaborador}</td>
            <td>${aditivo.email_colaborador}</td>
            <td>${aditivo.rua}</td>
            <td>${aditivo.numero}</td>
            <td>${aditivo.bairro}</td>
            <td>${aditivo.estado}</td>
            <td>${aditivo.cidade}</td>
            <td>${aditivo.responsavel}</td>
            <td>${aditivo.tipo}</td>
            <td>${aditivo.modelo}</td>
            <td>${aditivo.armazenamento}</td>
            <td>${aditivo.processador}</td>
            <td>${aditivo.memoria_ram}</td>
            <td>${aditivo.placa_video}</td>
            <td>${aditivo.fonte}</td>
            <td>${aditivo.numero_nf}</td>
            <td>${aditivo.cnpj}</td>
            <td>${aditivo.centro_custos}</td>
            <td>${aditivo.numero_serie}</td>
            <td>${aditivo.inicio_contrato}</td>
            <td>${aditivo.observacao_pedido}</td>
            <td><button onclick="openEditModal(${aditivo.id})">Ação</button></td>
        `;
  });
}

function filterAditivos() {
  const filterAditivo = document
    .getElementById("filterAditivo")
    .value.toLowerCase();
  const filterPatrimonio = document
    .getElementById("filterPatrimonio")
    .value.toLowerCase();
  const filterChamado = document
    .getElementById("filterChamado")
    .value.toLowerCase();
  const filterColaborador = document
    .getElementById("filterColaborador")
    .value.toLowerCase();
  const filterEmailColaborador = document
    .getElementById("filterEmailColaborador")
    .value.toLowerCase();

  const filteredAditivos = aditivos.filter((aditivo) => {
    return (
      aditivo.aditivo.toLowerCase().includes(filterAditivo) &&
      aditivo.patrimonio.toLowerCase().includes(filterPatrimonio) &&
      aditivo.chamado.toLowerCase().includes(filterChamado) &&
      aditivo.colaborador.toLowerCase().includes(filterColaborador) &&
      aditivo.email_colaborador.toLowerCase().includes(filterEmailColaborador)
    );
  });

  displayAditivos(filteredAditivos);
}

function clearFilters() {
  document.getElementById("filterAditivo").value = "";
  document.getElementById("filterPatrimonio").value = "";
  document.getElementById("filterChamado").value = "";
  document.getElementById("filterColaborador").value = "";
  document.getElementById("filterEmailColaborador").value = "";
  displayAditivos(aditivos);
}

async function deleteAditivo(id) {
  if (confirm("Tem certeza que deseja deletar este aditivo?")) {
    const response = await fetch(`/deleteAditivo/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      loadAditivos();
      closeModal();
    } else {
      alert("Falha ao excluir aditivo");
    }
  }
}

function openEditModal(id) {
  const aditivo = aditivos.find((aditivo) => aditivo.id === id);
  if (!aditivo) return;

  document.getElementById("editAditivoId").value = aditivo.id;
  document.getElementById("editAditivo").value = aditivo.aditivo;
  document.getElementById("editPatrimonio").value = aditivo.patrimonio;
  document.getElementById("editChamado").value = aditivo.chamado;
  document.getElementById("editColaborador").value = aditivo.colaborador;
  document.getElementById("editEmailColaborador").value =
    aditivo.email_colaborador;
  document.getElementById("editRua").value = aditivo.rua;
  document.getElementById("editNumero").value = aditivo.numero;
  document.getElementById("editBairro").value = aditivo.bairro;
  document.getElementById("editEstado").value = aditivo.estado;
  document.getElementById("editCidade").value = aditivo.cidade;
  document.getElementById("editResponsavel").value = aditivo.responsavel;
  document.getElementById("editTipo").value = aditivo.tipo;
  document.getElementById("editModelo").value = aditivo.modelo;
  document.getElementById("editArmazenamento").value = aditivo.armazenamento;
  document.getElementById("editProcessador").value = aditivo.processador;
  document.getElementById("editMemoriaRam").value = aditivo.memoria_ram;
  document.getElementById("editPlacaVideo").value = aditivo.placa_video;
  document.getElementById("editFonte").value = aditivo.fonte;
  document.getElementById("editNumeroNF").value = aditivo.numero_nf;
  document.getElementById("editCNPJ").value = aditivo.cnpj;
  document.getElementById("editCentroCustos").value = aditivo.centro_custos;
  document.getElementById("editNumeroSerie").value = aditivo.numero_serie;
  document.getElementById("editInicioContrato").value = aditivo.inicio_contrato;
  document.getElementById("editObservacaoPedido").value =
    aditivo.observacao_pedido;

  document.getElementById("aditivoModal").style.display = "block";
}

document
  .getElementById("editAditivoForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const id = document.getElementById("editAditivoId").value;
    const aditivo = document.getElementById("editAditivo").value;
    const patrimonio = document.getElementById("editPatrimonio").value;
    const chamado = document.getElementById("editChamado").value;
    const colaborador = document.getElementById("editColaborador").value;
    const email_colaborador = document.getElementById(
      "editEmailColaborador"
    ).value;
    const rua = document.getElementById("editRua").value;
    const numero = document.getElementById("editNumero").value;
    const bairro = document.getElementById("editBairro").value;
    const estado = document.getElementById("editEstado").value;
    const cidade = document.getElementById("editCidade").value;
    const responsavel = document.getElementById("editResponsavel").value;
    const tipo = document.getElementById("editTipo").value;
    const modelo = document.getElementById("editModelo").value;
    const armazenamento = document.getElementById("editArmazenamento").value;
    const processador = document.getElementById("editProcessador").value;
    const memoria_ram = document.getElementById("editMemoriaRam").value;
    const placa_video = document.getElementById("editPlacaVideo").value;
    const fonte = document.getElementById("editFonte").value;
    const numero_nf = document.getElementById("editNumeroNF").value;
    const cnpj = document.getElementById("editCNPJ").value;
    const centro_custos = document.getElementById("editCentroCustos").value;
    const numero_serie = document.getElementById("editNumeroSerie").value;
    const inicio_contrato = document.getElementById("editInicioContrato").value;
    const observacao_pedido = document.getElementById(
      "editObservacaoPedido"
    ).value;

    const response = await fetch(`/updateAditivo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
      }),
    });

    if (response.ok) {
      loadAditivos();
      closeModal();
    } else {
      alert("Falha ao atualizar aditivo");
    }
  });

function closeModal() {
  document.getElementById("aditivoModal").style.display = "none";
}

document.querySelector(".close").addEventListener("click", closeModal);

window.addEventListener("click", function (event) {
  if (event.target == document.getElementById("aditivoModal")) {
    closeModal();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabId = button.getAttribute("data-tab");

      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      button.classList.add("active");
      document.getElementById(tabId).classList.add("active");
    });
  });
});

// Função para adicionar aditivo (exemplo)
document
  .getElementById("aditivoForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const aditivoData = Object.fromEntries(formData.entries());

    fetch("/addAditivo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(aditivoData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Aditivo added successfully") {
          alert("Aditivo adicionado com sucesso");
          event.target.reset();
        } else {
          alert("Erro ao adicionar aditivo");
        }
      })
      .catch((error) => console.error("Error:", error));
  });

document
  .getElementById("deleteAditivoButton")
  .addEventListener("click", function () {
    const id = document.getElementById("editAditivoId").value;
    deleteAditivo(id);
  });

document
  .getElementById("filterAditivo")
  .addEventListener("input", filterAditivos);
document
  .getElementById("filterPatrimonio")
  .addEventListener("input", filterAditivos);
document
  .getElementById("filterChamado")
  .addEventListener("input", filterAditivos);
document
  .getElementById("filterColaborador")
  .addEventListener("input", filterAditivos);
document
  .getElementById("filterEmailColaborador")
  .addEventListener("input", filterAditivos);

loadAditivos();
