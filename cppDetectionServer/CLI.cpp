#include "CLI.h"

CLI::CLI(DefaultIO* dio) {
		this->dio=dio;
		commands.push_back(new UploadCSV(dio));
		commands.push_back(new Settings(dio));
		commands.push_back(new Detect(dio));
		commands.push_back(new Results(dio));
		commands.push_back(new UploadAnom(dio));
		commands.push_back(new Exit(dio));
		commands.push_back(new DetectSimple(dio));
}

void CLI::start(){
	SharedState sharedState;
	int index=-1;
	while(index!=5){
		string input = dio->read();
		index=input[0]-'0'-1;
		if(index>=0 && index<=6)
			commands[index]->execute(&sharedState);
	}
}


CLI::~CLI() {
	for(size_t i=0;i<commands.size();i++){
		delete commands[i];
	}
}

