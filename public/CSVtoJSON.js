var Papa = require('papaparse')
var fs = require('fs');
var express = require('express')
var app = express();
var path = require('path');
app.use(express.static(path.join(__dirname, "public")));

var columns_size;
var columns_vector={};
var parsedData;


// Function to read csv which returns a vector of the columns
function readCSV (filePath) {
    const csvFile = fs.readFileSync(filePath);
    const csvData = csvFile.toString();
    Papa.parse(csvData, {
      //header: true,
      complete: results => {
        parsedData=results.data;
        var i=1;
        var j=0;
        for(j;j<parsedData[0].length;j++){
          var vect =[]
        for(i;i<parsedData.length;i++){
          if (parsedData[i][j]!=null && parsedData[i][j]!="")
          vect.push(parsedData[i][j]);
        }
        columns_vector[parsedData[0][j]]=vect;
        i=1;
      }
      j=0;
      columns_size =parsedData.length-1;
      }
    });
    return columns_vector;
  }
 
  exports.readCSV = readCSV;
