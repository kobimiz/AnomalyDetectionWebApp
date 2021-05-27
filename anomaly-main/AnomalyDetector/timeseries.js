class Timeseries {
    features = [];
    //table = new Dictionary<string, List<float>>();
    table = {};
    constructor(CSVfileName) {
        //List<List<string>> csvTwoD = new List<List<string>>();
        let csvTwoD = [];

        let notRead = true;
        let line = String.Empty;
        let file = new System.IO.StreamReader(CSVfileName);
        while ((line = file.ReadLine()) != null) {
            parts_of_line = line.Split(',');
            if (notRead) {
                for (i = 0; i < parts_of_line.Length; i++) {
                    csvTwoD.push([]);
                }
                notRead = false;
            }
            //List<string> cur = new List<string>();
            cur = new List();
            for (j = 0; j < parts_of_line.Length; j++) {
                csvTwoD[j].push(parts_of_line[j].Trim());
            }
        }

        // Transpose the csvTwoD to get the correct order of lines as in the CVS file.
        //List<List<string>> transVec = new List<List<string>>();
        transVec = new List();
        for (i = 0; i < csvTwoD.length; i++) {
            //List<string> curVec = new List<string>();
            curVec = new List();
            for (j = 0; j < csvTwoD[i].length; j++) {
                curVec.Add(csvTwoD[i][j]);
            }
            transVec.Add(curVec);
        }
        //Dictionary<string, List<float>> itMap = new Dictionary<string, List<float>>();
        itMap = {};
        for (i = 0; i < transVec.Count(); i++) { // Loop through the map.
            //List<float> col = new List<float>();
            col = new List();
            for (j = 0; j < transVec[i].Count(); ++j) { // checks whether we are in the first line.
                if (j == 0) // Case line is 0 then it means its the title of the column.
                {
                    this.features.push(transVec[i][j]);
                    continue;
                }
                valueAsString = transVec[i][j];
                valueAsFloat = float.Parse(valueAsString);
                col.Add(valueAsFloat);
            }
            this.table.Add(transVec[i][0], col); // Adding the titles and column to the map.
        }
    }
}

module.exports = Timeseries;