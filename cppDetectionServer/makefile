object/Server.o: Server.cpp 
	g++ -g -c Server.cpp -o object/Server.o
object/anomaly_detection_util.o: anomaly_detection_util.cpp 
	g++ -g -c anomaly_detection_util.cpp -o object/anomaly_detection_util.o
object/CLI.o: CLI.cpp commands.h
	g++ -g -c CLI.cpp -o object/CLI.o
object/minCircle.o: minCircle.cpp 
	g++ -g -c minCircle.cpp -o object/minCircle.o
object/SimpleAnomalyDetector.o: SimpleAnomalyDetector.cpp 
	g++ -g -c SimpleAnomalyDetector.cpp -o object/SimpleAnomalyDetector.o
object/HybridAnomalyDetector.o: HybridAnomalyDetector.cpp 
	g++ -g -c HybridAnomalyDetector.cpp -o object/HybridAnomalyDetector.o
object/timeseries.o: timeseries.cpp 
	g++ -g -c timeseries.cpp -o object/timeseries.o
object/main.o: main.cpp 
	g++ -g -c main.cpp -o object/main.o

a.out: object/Server.o object/anomaly_detection_util.o object/CLI.o object/minCircle.o object/SimpleAnomalyDetector.o object/HybridAnomalyDetector.o object/timeseries.o object/main.o
	g++ -g object/*.o -pthread