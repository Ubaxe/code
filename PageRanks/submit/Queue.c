//
//
//


// Code from 2521 week 7 crawl work

// queue.c ... simple Queue of Strings
// Written by John Shepherd, September 2015

#include <assert.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "Queue.h"

typedef struct Node *Link;

typedef struct Node {
    int index;
    char *val;
    Link next;
} Node;

typedef struct QueueRep {
    int len;
    Link head;
    Link tail;
} QueueRep;

// Function signatures

static Link newNode (char *);
static void dropNode (Link);

// newQueue()
// - create an initially empty Queue
Queue newQueue ()
{
    Queue new = malloc (sizeof (QueueRep));
    assert (new != NULL);
    new->len = 0;
    new->head = NULL;
    new->tail = NULL;
    return new;
}

// dropQueue(Queue)
// - clean up memory associated with Queue
void dropQueue (Queue q)
{
    if (q == NULL)
        return;
    Link next, curr = q->head;
    while (curr != NULL) {
        next = curr->next;
        dropNode (curr);
        curr = next;
    }
    free (q);
}

// enterQueue(Queue,Str)
// - add Str to tail of Queue
void enterQueue (Queue q, char *str)
{
    Link new = newNode (str);
    new->index = q->len;
    if (q->head == NULL)
        q->head = q->tail = new;
    else {
        // add into list of elems
        q->tail->next = new;
        q->tail = new;
    }
    q->len++;
}

int LenQueue (Queue q) {
    return q->len;
}

// leaveQueue(Queue)
// - return string at head of Queue
char *leaveQueue (Queue q)
{
    assert (q->head != NULL);
    char *str = q->head->val;
    Link old = q->head;
    q->head = old->next;
    if (q->head == NULL)
        q->tail = NULL;
    q->len--;
    free (old);
    return str;
}


// emptyQueue(Queue)
// - check whether Queue is empty
int emptyQueue (Queue q)
{
    return (q->head == NULL);
}

// Copy Queue
Queue CopyQueue (Queue q) {
    Queue new = newQueue ();
    Link curr = q->head;
    while (curr != NULL) {
        enterQueue(new, curr->val);
        curr = curr->next;
    }
    return new;
}

// use string to find index of string in queue
int SearchIndex (Queue q, char *s) {
    Link curr = q->head;
    while (curr != NULL) {
        if (strcmp(curr->val, s) == 0) {
            return curr->index;
        }
        curr = curr->next;
    }
    return -1;
}

// check Queue whether has the same string
int CheckSameWord (Queue q, char *s) {
    Link curr = q->head;
    while (curr != NULL) {
        if (strcmp(curr->val, s) == 0) {
            return 1;
        }
        curr = curr->next;
    }
    return 0;
}

// showQueue(Queue)
// - display Queue (for debugging)
void showQueue (Queue q)
{
    Link curr;
    if (q->head == NULL)
        printf ("Queue is empty\n");
    else {
        //printf ("Queue (head-to-tail):\n");
        int id = 0;
        curr = q->head;
        while (curr != NULL) {
            printf ("%d : %s\n", curr->index, curr->val);
            id++;
            curr = curr->next;
        }
    }
}

// use index to get string in Queue
char *GetStringFromQ(Queue q, int index) {
    Link curr = q->head;
    for (int i = 0; curr != NULL ;curr = curr->next) {
        if (i == index) {
            return curr->val;
        }
        i++;
    }
    return NULL;
}


// Helper functions

static Link newNode (char *str)
{
    Link new = malloc (sizeof *new);
    assert (new != NULL);
    new->val = malloc(sizeof(char)*(strlen(str)+1));
    strcpy(new->val, str);
    new->next = NULL;
    new->index = 0;
    return new;
}

static void dropNode (Link curr)
{
    assert (curr != NULL);
    free (curr->val);
    free (curr);
}

