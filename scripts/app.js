// Datos iniciales (se guardan en localStorage)
let presupuesto = {
    ingresos: [
        { concepto: "Salario", esperado: 2250, real: 2246 },
        { concepto: "Comisión", esperado: 300, real: 302.5 }
    ],
    gastosFijos: [
        { concepto: "Arriendo", previsto: 450, real: 450, pagado: true }
    ]
};

// Cargar datos al iniciar
document.addEventListener('DOMContentLoaded', () => {
    cargarDatos();
    initTabs();
});

// Función para cargar datos en las tablas
function cargarDatos() {
    // Llenar tabla de ingresos
    const tablaIngresos = document.getElementById('tabla-ingresos').querySelector('tbody');
    tablaIngresos.innerHTML = presupuesto.ingresos.map(item => `
        <tr>
            <td contenteditable="true">${item.concepto}</td>
            <td contenteditable="true">${item.esperado}</td>
            <td contenteditable="true">${item.real}</td>
        </tr>
    `).join('');

    // Similar para gastos fijos/variables
}

// Función para cambiar pestañas
function initTabs() {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.tab, .tab-content').forEach(el => {
                el.classList.remove('active');
            });
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');
        });
    });
}

// Guardar datos en localStorage
function guardarDatos() {
    localStorage.setItem('presupuesto', JSON.stringify(presupuesto));
}