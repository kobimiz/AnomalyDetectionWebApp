//module.exports = this.AnomalyDetector;
const SimpleAnomalyDetector = require("./SimpleAnomalyDetector");

// Checked
class AnomalyReport {
    description;
    timeStep;
    constructor(description, timeStep) {
        this.description = description;
        this.timeStep = timeStep;
    }
}

// Checked