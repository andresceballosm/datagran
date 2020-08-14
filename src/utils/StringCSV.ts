const StringCSV = (data:any) => {
    var obj : any[] = [];
    var field = false;  // if we're inside a field = true

    for (var row = 0, col = 0, i = 0; i < data.length; i++) {
      
        var current = data[i];
        var next = data[i+1]; 

        obj[row] = obj[row] || [];      
        obj[row][col] = obj[row][col] || '';

        if (current === '"' && field && next === '"') { 
          obj[row][col] += current; ++i; 
          continue; 
        }  

        if (current === ',' && !field) { 
          ++col; 
          continue; 
        }

        if (current === '\r' && next === '\n' && !field) { 
          ++row; col = 0; ++i; 
          continue; 
        }

        if (current === '\n' && !field) { 
          ++row; col = 0; 
          continue; 
        }

        if (current === '\r' && !field) { 
          ++row; col = 0; 
          continue; 
        }

        obj[row][col] += current;
    }
    return obj;
}

export default StringCSV;