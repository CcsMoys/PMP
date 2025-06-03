function parseCSV(csvText) {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim() === '') continue;
        
        const values = lines[i].split(',');
        const entry = {};
        
        headers.forEach((header, index) => {
            entry[header] = values[index] ? values[index].trim() : '';
        });
        
        data.push(entry);
    }
    
    return data;
}

function loadCSV(fileInputId, callback) {
    const fileInput = document.getElementById(fileInputId);
    
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const csvData = parseCSV(e.target.result);
            callback(csvData);
        };
        
        reader.readAsText(file);
    });
}