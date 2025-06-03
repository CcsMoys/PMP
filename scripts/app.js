// ==== Gestión de Gastos Variables ====
document.getElementById('agregar-gasto').addEventListener('click', () => {
    const tabla = document.getElementById('tabla-gastos-variables').querySelector('tbody');
    const nuevaFila = `
        <tr>
            <td contenteditable="true">Nuevo gasto</td>
            <td contenteditable="true">Alimentación</td>
            <td contenteditable="true">${new Date().toLocaleDateString()}</td>
            <td contenteditable="true">0</td>
        </tr>
    `;
    tabla.innerHTML += nuevaFila;
    actualizarResumen();
});

// ==== Gestión de Ahorros ====
document.getElementById('agregar-ahorro').addEventListener('click', () => {
    const tabla = document.getElementById('tabla-ahorros').querySelector('tbody');
    const nuevaFila = `
        <tr>
            <td contenteditable="true">Viaje</td>
            <td contenteditable="true">Ahorro</td>
            <td contenteditable="true">1000</td>
            <td contenteditable="true">0</td>
        </tr>
    `;
    tabla.innerHTML += nuevaFila;
    actualizarGraficoAhorros();
});

// ==== Exportar a PDF ====
document.getElementById('exportar-pdf').addEventListener('click', () => {
    import('jspdf').then(({ jsPDF }) => {
        const doc = new jsPDF();
        doc.text('Resumen de Presupuesto', 10, 10);
        doc.save('presupuesto.pdf');
    });
});

// ==== Funciones auxiliares ====
function actualizarResumen() {
    // Lógica para calcular totales y actualizar gráficos
}

function actualizarGraficoAhorros() {
    // Actualizar gráfico de Chart.js
}