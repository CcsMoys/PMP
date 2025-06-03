// Gráfico de ahorros
function initGraficoAhorros() {
    const ctx = document.getElementById('grafico-ahorros').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Ene', 'Feb', 'Mar'],
            datasets: [{
                label: 'Ahorro acumulado',
                data: [200, 400, 600],
                borderColor: '#4CAF50'
            }]
        }
    });

    // Actualizar datos dinámicamente
    window.actualizarGraficoAhorros = (datos) => {
        chart.data.datasets[0].data = datos;
        chart.update();
    };
}