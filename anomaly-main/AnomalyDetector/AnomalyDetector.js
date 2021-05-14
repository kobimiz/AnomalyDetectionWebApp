//module.exports = this.AnomalyDetector;
const SimpleAnomalyDetector = require("./SimpleAnomalyDetector"); 

   // Checked
    class AnomalyReport
    {
        description;
        timeStep;
        AnomalyReport(description, timeStep)
        {
            this.description = description;
            this.timeStep = timeStep;
        }
    }

    // Checked
