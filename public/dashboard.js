document.addEventListener("DOMContentLoaded", function () {
  fetchDashboardData();
});

async function fetchDashboardData() {
  const response = await fetch("/getDashboardData");
  if (response.ok) {
    const data = await response.json();
    console.log(data); // Adicione este log
    createChart(
      "chartLicencasPorCategoria",
      "Quantidade de licenças por categoria",
      data.categorias
    );
    createChart(
      "chartLicencasPorDataCriacao",
      "Quantidade de licenças por data de criação",
      data.dataCriacao
    );
    createChart(
      "chartLicencasPorDepartamento",
      "Quantidade de licenças por departamento",
      data.departamento
    );
  } else {
    console.error("Failed to fetch dashboard data");
  }
}

function createChart(elementId, title, data) {
  const ctx = document.getElementById(elementId).getContext("2d");
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: Object.keys(data),
      datasets: [
        {
          data: Object.values(data),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: title,
        },
      },
    },
  });
}
