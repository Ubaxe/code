
#ifndef Graph_h
#define Graph_h
#include <stdbool.h>

typedef struct GraphRep *Graph;
typedef char * Url;
// vertices are ints
typedef int Vertex;

typedef struct GraphRep {
    int  **edges;   // adjacency matrix
    char **name;
    int    nV;      // # totall vertices
    int    totalV;
} GraphRep;


// edges are pairs of vertices (end-points)
typedef struct Edge {
    Vertex v;
    Vertex w;
} Edge;


Graph newGraph(int V);
void showGraph(Graph g);
void freeGraph(Graph g);
void insertEdge(Graph g, Url src,int index);
int check_name(Graph g, Url name);
int adjacent(Graph g, Url src,Url dest);
int total_vertor(Graph g);
float sum_in_link (Graph g, int index);
float sum_out_link (Graph g, int index);
int cal_out_degree (Graph g, int index);
int cal_in_degree (Graph g, int index);

//void wout(Graph g);
//void win(Graph g);


#endif 


