const AnomalyDetector = require('./AnomalyDetector');
const anomaly_detection_util = require('./anomaly_detection_util');

// module.exports = { detect: this.detect, learnNormal: this.learnNormal };

// module.exports.SimpleAnomalyDetector = this.SimpleAnomalyDetector;
//import {TimeSeriesAnomalyDetector} from './AnomalyDetector';
class correlatedFeatures {
    isCircle = false;
    feature1;
    feature2;  // names of the correlated features
    corrlation;
    lin_reg;
    threshold = 0.9;
    centerX;
    centerY;
    rad;
};

class SimpleAnomalyDetector {
    adu = new anomaly_detection_util();
    //correlatedFeatures list
    cf = [];
    threshold;
    SimpleAnomalyDetector(threshold) {
        this.threshold = threshold;
    }

    learnNormal(ts) {
        this.adu = new anomaly_detection_util();
        tsMap = ts.table;
        tsFeaturesVector = ts.features;
        featuresVectorSize = tsFeaturesVector.Count();
        valueVectorSize = tsMap[tsFeaturesVector[0]].Count();
        for (i = 0; i < featuresVectorSize; ++i) {
            fiName = tsFeaturesVector[i];
            fiData = tsMap[fiName].ToArray();
            maxPearson = 0;
            currentCF = new correlatedFeatures();
            currentCF.feature1 = fiName;
            for (j = i + 1; j < featuresVectorSize; ++j) {
                fjName = tsFeaturesVector[j];
                fjData = tsMap[fjName].ToArray();
                currentPearson = Math.Abs(adu.pearson(fiData, fjData, valueVectorSize));
                if (currentPearson > maxPearson) {
                    maxPearson = currentPearson;
                    currentCF.feature2 = fjName;
                }
            }
            if (maxPearson > this.threshold) {
                currentCF.corrlation = maxPearson;
                points = new Point[valueVectorSize];
                for (j = 0; j < valueVectorSize; ++j) {
                    points[j] = new Point(tsMap[currentCF.feature1][j], tsMap[currentCF.feature2][j]);
                }
                currentCF.lin_reg = adu.linear_reg(points, valueVectorSize);
                currentCF.threshold = 0;
                for (j = 0; j < valueVectorSize; ++j) {
                    currentCF.threshold = Math.Max(currentCF.threshold, Math.Abs(adu.dev(points[j], currentCF.lin_reg)));
                }
                currentCF.threshold *= 1.1;
                cf.push(currentCF);
            }
        }
    }

    detect(ts) {
        //AnomalyReport list
        let vector = [];
        let i = 0;
        this.cf.forEach(element => {
            for (j = 0; j < ts.table.First().Value.Count(); ++j) {
                // Loop through the map.
                iter = -1;
                // Loop through the cf vector.
                iter++;
                floatA = ts.table[element.feature1][j];
                floatB = ts.table[element.feature2][j];
                p = new Point(floatA, floatB); // A point represent the two current features.

                //float correlation = dev(*p, i->lin_reg);
                // Case the correlation is bigger then the threshold determined by the current correlation deviation.
                if (isAnomalous(element, p)) {
                    description = element.feature1 + "-" + element.feature2;
                    timeStep = j + 1; // For time step to start with 1 instead of 0.
                    ar = new AnomalyReport(description, timeStep); // Build a anomaly report with those features.
                    vector.push(ar);
                }
            }
            i++;
        });
        return vector;
    }

    cirCorr(cf, points, size) {
        return 0;
    }

    isAnomalous(cf, point) {
        correlation = adu.dev(point, cf.lin_reg);
        if (correlation > cf.threshold)
            return true;
        return false;
    }

    getNormalModel() {
        return cf;
    }
}
module.exports = SimpleAnomalyDetector;
