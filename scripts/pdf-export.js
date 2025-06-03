// Configuración avanzada de PDF
export function exportarPDF(contenidoId, nombreArchivo = 'presupuesto.pdf') {
    import('jspdf').then(({ jsPDF }) => {
        const doc = new jsPDF();
        const element = document.getElementById(contenidoId);
        
        // Usar html2canvas para capturar el contenido
        import('html2canvas').then((html2canvas) => {
            html2canvas.default(element).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                doc.addImage(imgData, 'PNG', 10, 10, 180, 0);
                doc.save(nombreArchivo);
            });
        });
    });
}