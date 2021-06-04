    //
//  searchPagerank.c
//  PageRanks
//
//  Created by Dylan on 27/7/19.
//  Copyright © 2019 Dylan. All rights reserved.
//


#include <assert.h>
#include <err.h>
#include <stdbool.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <sysexits.h>
#include <math.h>
#include "Graph.h"
#include "readData.h"


int main (int argc, char *argv[]) {

    if (argc < 2) {
        fprintf(stderr,"argument are not enough\n");
        exit(0);
    }
    Queue inverted = newQueue();
    Queue term = newQueue();
    Queue url = newQueue();
    char *invertIndex = malloc(sizeof(char)*1000);
    FILE *invert_txt = fopen("invertedIndex.txt", "r");
    for (int i = 1; i < argc; i++) {
        char *s1 = malloc(sizeof(char)*strlen(argv[i]));
        strcpy(s1, argv[i]);
        
        char *tk = NULL;
        if (ValidFile(invert_txt)) {
            while (fgets(invertIndex,1000,invert_txt)!= NULL) {
                enterQueue(inverted, invertIndex);
                tk = strtok(invertIndex, " \n");
                enterQueue(term, tk);
            }
        }
        int position = SearchIndex(term,s1);
        //printf("%d\n",position);
        char *string_1 = malloc(sizeof(char)*1000);
        if (GetStringFromQ(inverted,position) != NULL) {
            strcpy(string_1, GetStringFromQ(inverted,position));
        } 
        char *tk_1 = NULL;
        if (string_1 != NULL) {
            tk_1 = strtok(string_1, " \n");
            while (tk_1 != NULL) {
                if (strcmp(tk_1, argv[1]) != 0) {
                    if (!CheckSameWord(url, tk_1)) {
                        enterQueue(url, tk_1);
                    }
                }
                tk_1 = strtok(NULL, " \n");
            }
        }        

        
        free(string_1);
        free(s1);
    } 
        int line = 1;
        char *pr_value = malloc(sizeof(char)*1000);
        FILE *pr = fopen("pagerankList.txt","r");
        if (ValidFile(pr)) {
            while (fgets(pr_value,1000,pr)!= NULL) {
                strtok(pr_value,", ");
                if (CheckSameWord(url, pr_value) && line != 30) {
                    printf("%s\n",pr_value);
                }
                line++;
            }
        }
        free(pr_value);
        fclose(pr);
        dropQueue(url);
        dropQueue(inverted);
        dropQueue(term);
        free(invertIndex);
        fclose(invert_txt);
        return 0;       
}

