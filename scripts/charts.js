// Ejemplo de gráfico de gastos por categoría
document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('grafico-gastos').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Alimentación', 'Transporte', 'Ocio'],
            datasets: [{
                data: [300, 150, 100],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
            }]
        }
    });
});