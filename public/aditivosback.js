document
  .getElementById("aditivoForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const aditivoData = {
      aditivo: document.getElementById("aditivo").value,
      patrimonio: document.getElementById("patrimonio").value,
      chamado: document.getElementById("chamado").value,
      colaborador: document.getElementById("colaborador").value,
      email_colaborador: document.getElementById("email_colaborador").value,
      rua: document.getElementById("rua").value,
      numero: document.getElementById("numero").value,
      bairro: document.getElementById("bairro").value,
      estado: document.getElementById("estado").value,
      cidade: document.getElementById("cidade").value,
      responsavel: document.getElementById("responsavel").value,
      tipo: document.getElementById("tipo").value,
      modelo: document.getElementById("modelo").value,
      armazenamento: document.getElementById("armazenamento").value,
      processador: document.getElementById("processador").value,
      memoria_ram: document.getElementById("memoria_ram").value,
      placa_video: document.getElementById("placa_video").value,
      fonte: document.getElementById("fonte").value,
      numero_nf: document.getElementById("numero_nf").value,
      cnpj: document.getElementById("cnpj").value,
      centro_custos: document.getElementById("centro_custos").value,
      numero_serie: document.getElementById("numero_serie").value,
      inicio_contrato: document.getElementById("inicio_contrato").value,
      observacao_pedido: document.getElementById("observacao_pedido").value,
    };

    // Enviar os dados para o servidor (ajustar a URL do endpoint conforme necessário)
    fetch("/addAditivo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(aditivoData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Aditivo adicionado com sucesso!");
          document.getElementById("aditivoForm").reset();
        } else {
          alert("Erro ao adicionar aditivo.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Erro ao adicionar aditivo.");
      });
  });

document
  .getElementById("editAditivoForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const aditivoId = document.getElementById("editAditivoId").value;
    const aditivoData = {
      aditivo: document.getElementById("editAditivo").value,
      patrimonio: document.getElementById("editPatrimonio").value,
      chamado: document.getElementById("editChamado").value,
      colaborador: document.getElementById("editColaborador").value,
      email_colaborador: document.getElementById("editEmailColaborador").value,
      rua: document.getElementById("editRua").value,
      numero: document.getElementById("editNumero").value,
      bairro: document.getElementById("editBairro").value,
      estado: document.getElementById("editEstado").value,
      cidade: document.getElementById("editCidade").value,
      responsavel: document.getElementById("editResponsavel").value,
      tipo: document.getElementById("editTipo").value,
      modelo: document.getElementById("editModelo").value,
      armazenamento: document.getElementById("editArmazenamento").value,
      processador: document.getElementById("editProcessador").value,
      memoria_ram: document.getElementById("editMemoriaRam").value,
      placa_video: document.getElementById("editPlacaVideo").value,
      fonte: document.getElementById("editFonte").value,
      numero_nf: document.getElementById("editNumeroNF").value,
      cnpj: document.getElementById("editCNPJ").value,
      centro_custos: document.getElementById("editCentroCustos").value,
      numero_serie: document.getElementById("editNumeroSerie").value,
      inicio_contrato: document.getElementById("editInicioContrato").value,
      observacao_pedido: document.getElementById("editObservacaoPedido").value,
    };

    // Enviar os dados atualizados para o servidor (ajustar a URL do endpoint conforme necessário)
    fetch(`/updateAditivo/${aditivoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(aditivoData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Aditivo atualizado com sucesso!");
          document.getElementById("aditivoModal").style.display = "none";
          // Atualizar a tabela de aditivos (adicionar a lógica aqui)
        } else {
          alert("Erro ao atualizar aditivo.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Erro ao atualizar aditivo.");
      });
  });

document
  .getElementById("deleteAditivoButton")
  .addEventListener("click", function () {
    const aditivoId = document.getElementById("editAditivoId").value;

    // Enviar a solicitação de exclusão para o servidor (ajustar a URL do endpoint conforme necessário)
    fetch(`/deleteAditivo/${aditivoId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          alert("Aditivo deletado com sucesso!");
          document.getElementById("aditivoModal").style.display = "none";
          // Atualizar a tabela de aditivos (adicionar a lógica aqui)
        } else {
          alert("Erro ao deletar aditivo.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Erro ao deletar aditivo.");
      });
  });

function filterAditivos() {
  const filterAditivo = document.getElementById("filterAditivo").value;
  const filterPatrimonio = document.getElementById("filterPatrimonio").value;
  const filterChamado = document.getElementById("filterChamado").value;
  const filterColaborador = document.getElementById("filterColaborador").value;
  const filterEmailColaborador = document.getElementById(
    "filterEmailColaborador"
  ).value;

  // Enviar os dados de filtro para o servidor e atualizar a tabela de aditivos (ajustar a URL do endpoint conforme necessário)
  fetch("/filterAditivos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      filterAditivo,
      filterPatrimonio,
      filterChamado,
      filterColaborador,
      filterEmailColaborador,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Atualizar a tabela de aditivos com os dados filtrados (adicionar a lógica aqui)
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Erro ao filtrar aditivos.");
    });
}

function clearFilters() {
  document.getElementById("filterAditivo").value = "";
  document.getElementById("filterPatrimonio").value = "";
  document.getElementById("filterChamado").value = "";
  document.getElementById("filterColaborador").value = "";
  document.getElementById("filterEmailColaborador").value = "";
  // Atualizar a tabela de aditivos para mostrar todos os aditivos (adicionar a lógica aqui)
}

// Função para abrir o modal de edição com os dados do aditivo
function openEditModal(aditivoId) {
  // Buscar os dados do aditivo com o ID fornecido (ajustar a URL do endpoint conforme necessário)
  fetch(`/getAditivo/${aditivoId}`)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("editAditivoId").value = data.id;
      document.getElementById("editAditivo").value = data.aditivo;
      document.getElementById("editPatrimonio").value = data.patrimonio;
      document.getElementById("editChamado").value = data.chamado;
      document.getElementById("editColaborador").value = data.colaborador;
      document.getElementById("editEmailColaborador").value =
        data.email_colaborador;
      document.getElementById("editRua").value = data.rua;
      document.getElementById("editNumero").value = data.numero;
      document.getElementById("editBairro").value = data.bairro;
      document.getElementById("editEstado").value = data.estado;
      document.getElementById("editCidade").value = data.cidade;
      document.getElementById("editResponsavel").value = data.responsavel;
      document.getElementById("editTipo").value = data.tipo;
      document.getElementById("editModelo").value = data.modelo;
      document.getElementById("editArmazenamento").value = data.armazenamento;
      document.getElementById("editProcessador").value = data.processador;
      document.getElementById("editMemoriaRam").value = data.memoria_ram;
      document.getElementById("editPlacaVideo").value = data.placa_video;
      document.getElementById("editFonte").value = data.fonte;
      document.getElementById("editNumeroNF").value = data.numero_nf;
      document.getElementById("editCNPJ").value = data.cnpj;
      document.getElementById("editCentroCustos").value = data.centro_custos;
      document.getElementById("editNumeroSerie").value = data.numero_serie;
      document.getElementById("editInicioContrato").value =
        data.inicio_contrato;
      document.getElementById("editObservacaoPedido").value =
        data.observacao_pedido;
      document.getElementById("aditivoModal").style.display = "block";
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Erro ao buscar dados do aditivo.");
    });
}

// Função para fechar o modal de edição
document.querySelector(".close").addEventListener("click", function () {
  document.getElementById("aditivoModal").style.display = "none";
});
