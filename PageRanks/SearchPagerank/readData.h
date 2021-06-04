//
//  readData.h
//  PageRanks
//
//  Created by Dylan on 23/7/19.
//  Copyright © 2019 Dylan. All rights reserved.
//

#ifndef readData_h
#define readData_h

#include <stdio.h>
#include "Graph.h"
#include "Queue.h"
int ValidFile (FILE *f);
Queue Getcollection(char *filename);
Graph GetInToGraph (char *filename);
int cal_file_num (char *collectionFilename);
#endif /* readData_h */

