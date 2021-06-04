//
//  main.c
//  PageRanks
//
//  Created by Dylan on 22/7/19.
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

typedef struct pr *Page;

//array of structure pagerank to store pagerank
//value , degree and url name of each url
typedef struct pr{
    float value;    //Page rank value
    int degree;      //number of out degrres
    char *name;      //url name
    struct pr *next;
}pr;


Page PageListInsertInOrder (Page node, char *name, int degree, float value);
static Page newnode (char *name, int degree, float value);
void pagerank (Graph g, float d, float diffPR, int maxIterations);
void FreePageListNode (Page node);
void showPage (Page node);

int main(int argc, char *argv[]) {
    
    if (argc != 4) {
        fprintf(stderr,"argument are not enough\n");
        exit(0);
    }
    float d = atof(argv[1]);
    float diffPR = atof(argv[2]);
    int maxIterations = atoi(argv[3]);
        //printf("d: %.7f | diffPR: %.7f | maxIterations %d\n",d,diffPR,maxIterations);
    //int total = cal_file_num ("collection.txt");
    //Graph g = newGraph(total);
    Graph g = GetInToGraph("collection.txt");
    pagerank(g,d, diffPR, maxIterations);
    freeGraph(g);
    return 0;
}


void pagerank(Graph g, float d, float diffPR, int maxIt) {
    
    //declare and initialise required variables
    int v = total_vertor(g);
    float url_sum = 0;
    float *pr = (float *)malloc(total_vertor(g)*sizeof(float));
    float *tmp = (float *)malloc(total_vertor(g)*sizeof(float));
    float fv = (float)v;
    // make a base
    for(int i=0; i<v; i++){
        pr[i] = 1 / fv;
    }
    int itera = 0;
    
    float diffsum = 0;
    
    
    float win = 0; float wout = 0;float degree = 0;
    float diff = diffPR;
    while(itera < maxIt && diff >= diffPR){
        diffsum = 0;
        for (int a = 0; a < v; a++) {
            tmp[a] = pr[a];
            // store the value before calcualte sum
            // then use the tmp into diffsum
        }
        for(int i = 0; i < v; i++){
            url_sum = 0; // reset the sum value
            for(int j = 0; j < v; j++){
                if(g->edges[j][i]){
                    // win is for inlink degree and wout is for outlink degree
                    // if the out degree is zero, it will be 0.5 otherwise the value can not divided by zero
                    win = cal_in_degree(g, i) / sum_in_link(g, j);
                    degree = cal_out_degree(g, i);
                    if (degree == 0) degree = 0.5;
                    wout = degree / sum_out_link(g, j);
                    url_sum = url_sum + tmp[j]*win*wout;
                }
            }
            // formula from assignment instrument
            pr[i] = (1-d)/fv + d*url_sum;
            diffsum += fabs(pr[i] - tmp[i]);
        }
        itera++;
        diff = diffsum;
        
    }
    // create a link structure to sort
    Page node = NULL;
    for (int o = 0; o < v; o++) {
        node = PageListInsertInOrder(node,g->name[o],cal_out_degree(g, o),pr[o]);
    }
    showPage(node);
    free(pr);
    free(tmp);
    FreePageListNode(node);
    
}
// create node for pageList
static Page newnode (char *name, int degree, float value) {
    Page p = malloc(sizeof(*p));
    if (p == NULL) err (EX_OSERR, "couldn't allocate FileListNode node");
    p->name = malloc(sizeof(char)*1000);
    strcpy(p->name, name);
    p->degree = degree;
    p->value = value;
    p->next = NULL;
    return p;
}
// sort pageList by descending order
Page PageListInsertInOrder (Page node, char *name, int degree, float value) {
    Page n = newnode (name,degree,value);
    if (node == NULL) {
        return n;
    } else {
        Page head = node;
        Page curr = head->next;
        while (head != NULL) {
            if (head->value <= value) {
                n->next = head;
                return n;
            } else if (head->value >= value && (curr == NULL)){
                head->next = n;
                return node;
            } else if (head->value >= value && curr->value <= value) {
                head->next = n;
                n->next = curr;
                return node;
            }
            head = head->next;
            curr = curr->next;
        }
    }
    return node;
    
}
// free List
void FreePageListNode (Page node) {
    if (node == NULL) return;
    else {
        Page first = node;
        while (first != NULL) {
            Page next = first->next;
            free (first->name);
            free (first);
            first = next;
        }
        
    }
}
// write output into pagerankList.txt
void showPage (Page node) {
    FILE *f = fopen("pagerankList.txt", "w");
    Page curr = node;
    if (ValidFile(f)) {
    while (curr != NULL) {
        fprintf(f,"%s, %d, %.7f\n",curr->name,curr->degree,curr->value);
        curr = curr->next;
    }
    fclose(f);
    }
    
}

