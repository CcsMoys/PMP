function cargarDatos() {
    fetch('assets/datos-presupuesto.csv')
        .then(response => response.text())
        .then(csv => {
            const datos = parsearCSV(csv);
            window.datosPresupuesto = datos;
            actualizarDashboard();
        });
}

function parsearCSV(csv) {
    const lineas = csv.split('\n');
    const datos = [];
    for (let i = 1; i < lineas.length; i++) {
        const [mes, categoria, tipo, monto, obs] = lineas[i].split(',');
        datos.push({ mes, categoria, tipo, monto: parseFloat(monto), obs });
    }
    return datos;
}