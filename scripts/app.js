let budgetData = [];

document.addEventListener('DOMContentLoaded', function() {
    // Cargar datos iniciales
    fetch('assets/datos-presupuesto.csv')
        .then(response => response.text())
        .then(csvText => {
            budgetData = parseCSV(csvText);
            updateDashboard();
            populateMonthFilter();
        });

    // Configurar carga de CSV
    loadCSV('csvInput', function(data) {
        budgetData = data;
        updateDashboard();
        populateMonthFilter();
    });

    // Configurar filtros
    document.getElementById('monthFilter').addEventListener('change', updateDashboard);
    document.getElementById('typeFilter').addEventListener('change', updateDashboard);
});

function populateMonthFilter() {
    const monthFilter = document.getElementById('monthFilter');
    const months = [...new Set(budgetData.map(item => item.mes))];
    
    // Limpiar opciones excepto "Todos"
    while (monthFilter.options.length > 1) {
        monthFilter.remove(1);
    }
    
    // Añadir meses únicos
    months.forEach(month => {
        const option = document.createElement('option');
        option.value = month;
        option.textContent = month;
        monthFilter.appendChild(option);
    });
}

function updateDashboard() {
    const monthFilter = document.getElementById('monthFilter').value;
    const typeFilter = document.getElementById('typeFilter').value;
    
    // Filtrar datos
    let filteredData = [...budgetData];
    
    if (monthFilter !== 'all') {
        filteredData = filteredData.filter(item => item.mes === monthFilter);
    }
    
    if (typeFilter !== 'all') {
        filteredData = filteredData.filter(item => item.tipo === typeFilter);
    }
    
    // Actualizar gráficos y tabla
    updatePieChart(filteredData);
    updateBarChart(filteredData);
    updateDataTable(filteredData);
}

function updatePieChart(data) {
    const ctx = document.getElementById('pieChart').getContext('2d');
    
    // Agrupar por categoría
    const categories = {};
    data.forEach(item => {
        if (item.tipo.includes('Gasto')) {
            if (!categories[item.categoria]) {
                categories[item.categoria] = 0;
            }
            categories[item.categoria] += parseFloat(item.monto);
        }
    });
    
    // Destruir gráfico anterior si existe
    if (window.pieChart) {
        window.pieChart.destroy();
    }
    
    window.pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(categories),
            datasets: [{
                data: Object.values(categories),
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
                    '#9966FF', '#FF9F40', '#8AC24A', '#607D8B'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });
}

function updateBarChart(data) {
    const ctx = document.getElementById('barChart').getContext('2d');
    
    // Agrupar por mes
    const months = [...new Set(data.map(item => item.mes))];
    const incomeByMonth = {};
    const expensesByMonth = {};
    
    months.forEach(month => {
        incomeByMonth[month] = 0;
        expensesByMonth[month] = 0;
    });
    
    data.forEach(item => {
        const amount = parseFloat(item.monto);
        if (item.tipo === 'Ingreso') {
            incomeByMonth[item.mes] += amount;
        } else {
            expensesByMonth[item.mes] += amount;
        }
    });
    
    // Destruir gráfico anterior si existe
    if (window.barChart) {
        window.barChart.destroy();
    }
    
    window.barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Ingresos',
                    data: months.map(month => incomeByMonth[month]),
                    backgroundColor: '#4BC0C0'
                },
                {
                    label: 'Gastos',
                    data: months.map(month => expensesByMonth[month]),
                    backgroundColor: '#FF6384'
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function updateDataTable(data) {
    const tableBody = document.querySelector('#dataTable tbody');
    tableBody.innerHTML = '';
    
    data.forEach(item => {
        const row = document.createElement('tr');
        
        const monthCell = document.createElement('td');
        monthCell.textContent = item.mes;
        row.appendChild(monthCell);
        
        const categoryCell = document.createElement('td');
        categoryCell.textContent = item.categoria;
        row.appendChild(categoryCell);
        
        const typeCell = document.createElement('td');
        typeCell.textContent = item.tipo;
        row.appendChild(typeCell);
        
        const amountCell = document.createElement('td');
        amountCell.textContent = parseFloat(item.monto).toFixed(2);
        row.appendChild(amountCell);
        
        tableBody.appendChild(row);
    });
}