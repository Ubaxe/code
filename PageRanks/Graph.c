
#include "Graph.h"
#include <stdlib.h>
#include <stdio.h>
#include <assert.h>
#include <string.h>



Graph newGraph(int V) {
    assert(V >= 0);
    int i;
    Graph g = malloc(sizeof(GraphRep));
    assert(g != NULL);
    g->totalV = V;
    g->nV = 0;
    // allocate memory for each row
    g->edges = malloc(V * sizeof(int *));
    g->name = malloc(V * sizeof(char *));
    assert(g->edges != NULL);
    // allocate memory for each column and initialise with 0
    for (i = 0; i < V; i++) {
        g->edges[i] = calloc(V, sizeof(int));
        g->name[i] = calloc(V, sizeof(char));
        for (int j = 0; j < V; j++) {
            g->edges[i][j] = 0;
        }
        assert(g->edges[i] != NULL);
        assert(g->name[i] != NULL);
    }
    return g;
}

void insertEdge(Graph g, Url src,int index) {
    
    int v = check_name(g,src);
    if (v == -1) {
        if (g->nV >= g->totalV) return;
        strcpy(g->name[g->nV], src);
        v = g->nV;
        g->nV++;
    } else {
        g->edges[v][index] = 1;
    }
    //printf("%d %d\n",v,w);
}

int check_name(Graph g, Url name) {
    
    for (int i = 0; i < g->totalV; i++) {
        if (strcmp(g->name[i], name) == 0) {
            return i;
        }
    }
    return -1;
}

int cal_out_degree (Graph g, int index) {
    int out = 0;
    for (int j = 0; j < g->totalV; j++)
        if (g->edges[index][j] == 1) out+=1;
    return out;
}

int cal_in_degree (Graph g, int index) {
    int in = 0;
    for (int j = 0; j < g->totalV; j++)
        if (g->edges[j][index] == 1) in+=1;
    return in;
}

float sum_in_link (Graph g, int index) {
    float sum = 0;
    for (int j = 0; j < g->totalV; j++) {
        if (g->edges[index][j] == 1) {
            sum+=cal_in_degree(g, j);
        }
    }
    return sum;
}

float sum_out_link (Graph g, int index) {
    float sum = 0;
    for (int j = 0; j < g->totalV; j++) {
        if (g->edges[index][j] == 1) {
            float degree = 0;
            degree = cal_out_degree(g, j);
            if (degree == 0) degree = 0.5;
            sum+=degree;
        }
    }
    return sum;
}


void showGraph(Graph g) {
    assert(g != NULL);
    int i, j;
    for (i = 0; i < g->totalV; i++) {
        printf("%d -> %s",i, g->name[i]);
        for (j = 0; j < g->totalV; j++) {
            printf("  %d |",g->edges[i][j]);
        }
        printf("\n");
    }
    printf(" ----- --------- -------- \n");
    printf("urlsNo: %d\n",g->totalV);
    for (int a = 0; a < g->totalV; a++) {
        printf("nodeid: %d , indegree: %d , outdegree: %d\n",a,cal_in_degree(g,a),cal_out_degree(g,a));
    }
}

int total_vertor(Graph g) {
    return g->totalV;
}
void freeGraph(Graph g) {
    assert(g != NULL);
    
    int i;
    for (i = 0; i < g->nV; i++) {
        free(g->edges[i]);
        free(g->name[i]);
    }
    free(g->edges);
    free(g->name);
    free(g);
}


