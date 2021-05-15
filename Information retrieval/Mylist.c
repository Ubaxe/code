//
//  Mylist.c
//  invertedIndex
//
//  Created by Dylan on 1/7/19.
//  Copyright © 2019 Dylan. All rights reserved.
//

#include "Mylist.h"
#include <assert.h>
#include <err.h>
#include <stdbool.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <sysexits.h>

#include "Mylist.h"

#define True 1
#define False 0

static FileList NewFileListNode (char *str);


// create a node for FileList
// it defalut every node's tf is 1 if the file really exist.
static FileList NewFileListNode (char *str)
{
    FileList n = malloc (sizeof *n);
    if (n == NULL) err (EX_OSERR, "couldn't allocate FileListNode node");
    n->filename = malloc(sizeof(char)*strlen(str)+1);
    strcpy(n->filename, str);
    n->tf = 0;
    n->next = NULL;
    return n;
}

// free node in FileList
void FreeFileListNode (FileList node)
{
    if (node == NULL) return;
    else {
        FileList first = node;
        while (first != NULL) {
            FileList next = first->next;
            free (first->filename);
            free (first);
            first = next;
        }
        
    }
}

// when node is inserted into FileList, the node will be sorted into a appropriate position in File list
FileList FileListInsertInOrder (FileList node, char *str)
{
    FileList n = NewFileListNode (str);
    n->tf = 1;
    if (node == NULL) {
        //n->tf++;
        return n;
    } else {
        FileList head = node;
        FileList curr = head->next;
        while (head != NULL) {
            if (strcmp(head->filename,str) >= 0) {
                n->next = head;
                return n;
            }
            else if (strcmp(head->filename,str) <= 0 && (curr == NULL)){
                head->next = n;
                return node;
            } else if ((strcmp(head->filename, str) <= 0 ) && (strcmp(curr->filename, str) >= 0 )) {
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


// move pointer in node in order to calculate value
FileList Move_Same_Node (FileList node, char *str) {
    while (node != NULL) {
        if (strcmp(node->filename, str) == 0) {
            return node;
        }
        node = node->next;
    }
    return NULL;
}

// check the list whether has the same node
int check_same_node (FileList node, char *str) {
    while (node != NULL) {
        if (strcmp(node->filename, str) == 0) {
            return True;
        }
        node = node->next;
    }
    return False;
}

// write output into specific txt
void ShowList (FileList node,FILE *f) {
    while (node != NULL) {
        fprintf(f,"%s ",node->filename);
        node = node->next;
    }
    
}

// calculate the len of list
int list_length (FileList node) {
    int len = 0;
    while (node != NULL) {
        len++;
        node = node->next;
    }
    return len;
}

