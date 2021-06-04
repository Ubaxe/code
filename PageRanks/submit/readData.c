//
//  readData.c
//  PageRanks
//
//  Created by Dylan on 23/7/19.
//  Copyright © 2019 Dylan. All rights reserved.
//

#include "readData.h"
#include "Graph.h"
#include "Queue.h"
#include <stdlib.h>
#include <stdio.h>
#include <assert.h>
#include <string.h>

int ValidFile (FILE *f);
int find_index (char **str, int len, char *url);

Graph GetInToGraph (char *filename) {

    FILE *col_file = fopen(filename, "r");
    char *url = malloc(sizeof(char)*100);
    int maxUrl = cal_file_num (filename);
    Graph g = newGraph(maxUrl);

    // create 2d array and allocate memory into 2d array
    // initialise 2d array
    char **url_string = malloc(maxUrl*sizeof(int *));
    for (int i = 0; i < maxUrl; i++) {
        url_string[i] = calloc(maxUrl, sizeof(char));
    }
    // open the collection.txt and read the every url name 
    // insert into 2d array
    // insert the url name into graph
    if (ValidFile(col_file)) {
        int i = 0;
        while (fscanf(col_file, "%s",url) != EOF) {
            strcpy(url_string[i],url);
            insertEdge(g, url,0);
            i++;
        }
    }
    fclose(col_file);
    
    char *url_txt = malloc(sizeof(char)*100);
    char *w = malloc(sizeof(char)*1000);
    for (int i = 0; i < maxUrl; i++) {
        // get url name from 2d array
        // use strcat .txt in back of string
        // then use these strings as file name to open
        strcpy(url_txt,url_string[i]);
        strcat(url_txt, ".txt");
        FILE *f = fopen(url_txt, "r");
        if (ValidFile(f)) {
            while (fscanf(f,"%s",w) != EOF) {
                    // if scan word which are "start" and "Section-1" will be ignore
                    // if scan word which is "#end" will be break
                    // Thus, the string will be scan between #start and #end (url name) 
                    if (strcmp(w, "#start") == 0 || strcmp(w, "Section-1") == 0 ) continue;
                    if (strcmp(w, url_string[i]) == 0) {
                        //printf("      ## Ignored self-loop: %s to %s\n", w, url_string[i]);
                        
                        continue;  
                    }
                    if (strcmp(w, "#end") == 0)  {
                        break;
                    }
                    // use string to find index in 2d array
                    // then add edge into graph by index
                    int index = find_index(url_string, maxUrl, w);
                    insertEdge(g, url_string[i],index);
                    
                }
        
        }
        fclose(f);
    }

    free(w);
    free(url);
    free(url_string);
    free(url_txt);

    return g;
}

// find index in 2d array
int find_index (char **str, int len, char *url) {
    for (int i = 0; i < len; i++) {
        if (strcmp(str[i],url) == 0) {
            return i;
        }
    }
    return -1;
}

// calculate the number of files
int cal_file_num (char *collectionFilename) {
    int num = 0;
    FILE *col = fopen (collectionFilename,"r");
    char *col_file = malloc (sizeof(char) *100);
    if (ValidFile(col)) {
        while (fscanf(col,"%s",col_file)!= EOF) {
            num++;
        }
    }
    fclose(col);
    free(col_file);
    return num;
}

// check File whether is Valid
int ValidFile (FILE *f) {
    if (f == NULL) {
        fprintf(stderr, "The file can not open\n");
        return 0;
    } else {
        return 1;
    }
}



