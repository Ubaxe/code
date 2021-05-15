//
//  TfIdfList.c
//  invertedIndex
//
//  Created by Dylan on 5/7/19.
//  Copyright © 2019 Dylan. All rights reserved.
//



#include <assert.h>
#include <err.h>
#include <stdbool.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <sysexits.h>

#include "TfIdfList.h"
#include "invertedIndex.h"

#define True 1
#define False 0

static TfIdfList newTfIdfListNode (char *str,double TfIdf);

// create TFidfListNode
static TfIdfList newTfIdfListNode (char *str,double TfIdf)
{
    TfIdfList n = malloc (sizeof *n);
    if (n == NULL) err (EX_OSERR, "couldn't allocate FileListNode node");
    n->filename = malloc(sizeof(char)*strlen(str)+1);
    strcpy(n->filename, str);
    n->tfidf_sum = TfIdf;
    n->next = NULL;
    return n;
}

// print List's value
void ShowTfIdfList (TfIdfList node) {
    while (node != NULL) {
        printf("%lf  %s\n",node->tfidf_sum,node->filename);
        node = node->next;
    }
}

// free List
void FreeTfIdfList (TfIdfList node)
{
    if (node == NULL) return;
    else {
        TfIdfList first = node;
        while (first != NULL) {
            TfIdfList next = first->next;
            free (first->filename);
            free (first);
            first = next;
        }
    }
}
// this is function like the sort list function by descending order
// if the tfidf_sum is same, the file name will be sorted by ascending order
TfIdfList TfIdfListInsertInOrder (TfIdfList node, char *str,double TfIdf)
{
    
    TfIdfList n = newTfIdfListNode (str,TfIdf);
    //for_test_print_node(n);
    if (node == NULL) {
        return n;
    } else {
        TfIdfList head = node;
        TfIdfList curr = head->next;
        while (head != NULL) {
            if (head->tfidf_sum < TfIdf) {
                n->next = head;
                return n;
            } else if (head->tfidf_sum > TfIdf && curr == NULL){
                head->next = n;
                return node;
            } else if (head->tfidf_sum > TfIdf && curr->tfidf_sum < TfIdf) {
                head->next = n;
                n->next = curr;
                return node;
            } else if (head->tfidf_sum == TfIdf) {
                
                // only have a node in list
                if (curr == NULL) {
                    if (strcmp(head->filename, str) < 0) {
                        head->next = n;
                        return node;
                    }
                } else if (curr != NULL){
                    TfIdfList last = FindNodeSameValueEnd (head, str,TfIdf);
                    if (last->next != NULL) {
                        TfIdfList tmp = last->next;
                        last->next = n;
                        n->next = tmp;
                        return node;
                    }
                    last->next = n;
                    return node;
                }
            }
            head = head->next;
            curr = curr->next;
        }
    }
    return node;
    
}

TfIdfList TfIdfListInsertSummation (TfIdfList node, char *str,double TfIdf)
{
    if (node == NULL) {
        TfIdfList n = newTfIdfListNode (str,TfIdf);
        return n;
    } else {
        TfIdfList head = node;
            if (CheckSameNode (head,str) == True) {
                FindSameFileName (head, str,TfIdf);
                return node;
            } else {
                TfIdfList n = newTfIdfListNode (str,TfIdf);
                TfIdfList end = MoveEnd (head);
                end->next = n;
                return node;
            }
        }
    }
// L1 is a non-sort list and L2 is a sorted-list
TfIdfList TfIdfListSort (TfIdfList L1,TfIdfList L2) {
    
    TfIdfList curr = L1;
    while (curr != NULL) {
        L2 = TfIdfListInsertInOrder (L2, curr->filename,curr->tfidf_sum);
        curr = curr->next;
    }
    return L2;
}

TfIdfList MoveEnd (TfIdfList node) {
    while (node->next != NULL) {
        node= node->next;
    }
    return node;
}
int CheckSameNode (TfIdfList node, char *str) {
    while (node != NULL) {
        if (strcmp(node->filename, str) == 0) {
            return True;
        }
        node = node->next;
    }
    return False;
}


void FindSameFileName (TfIdfList node, char *str,double TfIdf) {
    TfIdfList curr = node;
    if (curr == NULL) return;
    if (strcmp(curr->filename, str) == 0) {
        curr->tfidf_sum+=TfIdf;
    }
    FindSameFileName (curr->next ,str,TfIdf);
}


TfIdfList FindNodeSameValueEnd (TfIdfList node, char *str,double TfIdf) {
    
    TfIdfList curr = node;
    if (curr->next == NULL) return curr;
    if (curr->next->tfidf_sum != TfIdf) return curr;
    else {
        TfIdfList n = FindNodeSameValueEnd (curr->next, str,TfIdf);
        return n;
    }
}

// for debugging
/*
 void for_test_print_node(TfIdfList node) {
 printf("-------\n");
 printf("for_test_print_node: %s %.4lf\n",node->filename,node->tfidf_sum);
 printf("-------\n");
 }
 */


