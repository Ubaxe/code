// queue.h ... interface to simple Queue of Strings
// Written by John Shepherd, September 2015

#ifndef QUEUE_H
#define QUEUE_H

typedef struct QueueRep *Queue;

// Function signatures

Queue newQueue (void);
//Queue CopyQueue (Queue q);
void dropQueue (Queue);
void enterQueue (Queue, char *);
char *leaveQueue (Queue);
int emptyQueue (Queue);
Queue CopyQueue (Queue q);
int SearchIndex (Queue q, char *s);
char *SearchSubString (Queue q, char *s);
int CheckSameWord (Queue q, char *s);
char *GetStringFromQ(Queue q, int index);
void showQueue (Queue q);
int LenQueue (Queue q);

#endif

