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

void writeStr(string input, int serverFD) {
    write(serverFD, input.c_str(), input.length());
    write(serverFD, "\n", 1);
}
int initClient(int port)throw (const char*) {
    int serverFD, n;
    struct sockaddr_in serv_addr;
    struct hostent* server;

    serverFD = socket(AF_INET, SOCK_STREAM, 0);
    if (serverFD < 0)
        throw "socket problem";

    server = gethostbyname("localhost");
    if (server == NULL)
        throw "no such host";

    serv_addr.sin_family = AF_INET;
    bcopy((char*)server->h_addr, (char*)&serv_addr.sin_addr.s_addr, server->h_length);

    serv_addr.sin_port = htons(port);
    if (connect(serverFD, (struct sockaddr*)&serv_addr, sizeof(serv_addr)) < 0)
        throw "connection problem";

    return serverFD;
}
string readStr(int serverFD) {
    string serverInput = "";
    char c = 0;
    read(serverFD, &c, sizeof(char));
    while (c != '\n') {
        serverInput += c;
        read(serverFD, &c, sizeof(char));
    }
    return serverInput;
}
void readMenue(int serverFD) {
    bool done = false;
    while (!done) {
        // read string line
        string serverInput = readStr(serverFD);
        if (serverInput == "6.exit")
            done = true;
        cout << serverInput << endl;
    }
}

void clientSide1(int port) throw (const char*) {

    int serverFD = initClient(port);

    ifstream in("input.txt");
    string input = "";
    while (input != "6") {
        readMenue(serverFD);
        getline(in, input);

        writeStr(input, serverFD);
        if (input == "1") {
            cout << readStr(serverFD) << endl; // please upload...
            while (input != "done") {
                getline(in, input);
                writeStr(input, serverFD);
            }
            cout << readStr(serverFD) << endl; // Upload complete
            cout << readStr(serverFD) << endl; // please upload...
            input = "";
            while (input != "done") {
                getline(in, input);
                writeStr(input, serverFD);
            }
            cout << readStr(serverFD) << endl; // Upload complete
        }

        if (input == "3") {
            cout << readStr(serverFD) << endl; // Anomaly... complete
        }
        if (input == "5") {
            cout << readStr(serverFD) << endl; // please upload...
            while (input != "done") {
                getline(in, input);

                writeStr(input, serverFD);
            }
            cout << readStr(serverFD) << endl; // Upload complete
            cout << readStr(serverFD) << endl; // TPR
            cout << readStr(serverFD) << endl; // FPR
        }
    }
    in.close();

    close(serverFD);
    cout << "end of client 2" << endl;
}
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