#include <iostream>
#include <fstream>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <netdb.h>
#include <pthread.h>
#include <thread>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <time.h>
#include "Server.h"

int main() {
    try {
        AnomalyDetectionHandler adh;
        Server server(8000);
        server.start(adh); // runs on its own thread
        // clientSide1(8000);
        // let's run 2 clients
        server.stop(); // joins the server's thread
    }
    catch (const char* s) {
        //cout<<s<<endl;
    }
}