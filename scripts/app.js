let graficoBarras, graficoCircular;

function actualizarDashboard() {
    const mesSeleccionado = document.getElementById('mes').value;
    const tipoSeleccionado = document.getElementById('tipo').value;
    
    // Filtrar datos
    const datosFiltrados = window.datosPresupuesto.filter(item => {
        return (mesSeleccionado === 'all' || item.mes === mesSeleccionado) &&
               (tipoSeleccionado === 'all' || item.tipo === tipoSeleccionado);
    });

    // Actualizar gráficos
    actualizarGraficoBarras(datosFiltrados);
    actualizarGraficoCircular(datosFiltrados);
    actualizarTabla(datosFiltrados);
}

function actualizarGraficoBarras(datos) {
    const ctx = document.getElementById('graficoBarras').getContext('2d');
    const meses = [...new Set(datos.map(item => item.mes))];
    
    if (graficoBarras) graficoBarras.destroy();
    
    graficoBarras = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: meses,
            datasets: [
                {
                    label: 'Ingresos',
                    data: meses.map(mes => sumarPorTipo(datos, mes, 'Ingreso')),
                    backgroundColor: '#4BC0C0'
                },
                {
                    label: 'Gastos',
                    data: meses.map(mes => sumarPorTipo(datos, mes, 'Gasto Variable') + sumarPorTipo(datos, mes, 'Gasto Fijo')),
                    backgroundColor: '#FF6384'
                }
            ]
        }
    });
}

function sumarPorTipo(datos, mes, tipo) {
    return datos
        .filter(item => item.mes === mes && item.tipo === tipo)
        .reduce((sum, item) => sum + item.monto, 0);
}