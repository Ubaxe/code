//  Created by Dylan on 3/7/19.
//  Copyright © 2019 Dylan. All rights reserved.
//


#include <assert.h>
#include <err.h>
#include <sysexits.h>
#include <stdbool.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#include "Mylist.h"
#include "MyBSTree.h"

#define True 1
#define False 0


static InvertedIndexBST NewBSTreeNode (char *str);

// create a new tree node
static InvertedIndexBST NewBSTreeNode (char *str) {
    InvertedIndexBST t = malloc(sizeof *t);
    if (t == NULL) err (EX_OSERR, "couldn't allocate Tree Node");
    t->word = malloc(sizeof(char)*strlen(str)+1);
    strcpy(t->word, str);
    t->fileList = NULL;
    t->left = t->right = NULL;
    return t;
}


// use recursion way to insert node into tree
// but if the node has been in the tree
// it will calcualte the tf value rather than keeping on inserting node into tree
// when calculate value, it will use functions from Mylist's move_same_node to calculate this tf value for file
InvertedIndexBST BSTreeInsert (InvertedIndexBST t, char *str,char *filename)
{
    if (t == NULL) {
        t = NewBSTreeNode(str);
        t->fileList = FileListInsertInOrder (t->fileList, filename);
        return t;
    } else if (strcmp(str, t->word) < 0) {
        t->left = BSTreeInsert (t->left, str,filename);
    } else if (strcmp(str, t->word) > 0) {
        t->right = BSTreeInsert (t->right, str,filename);
    } else  {
        
        if (check_same_node(t->fileList, filename) == false) {
            t->fileList = FileListInsertInOrder (t->fileList, filename);
        } else if (check_same_node(t->fileList, filename) == true) {
            FileList same = t->fileList;
            same = Move_Same_Node (same,filename);
            same->tf++;
        }
        
    }
    return t;
}

// code from lab
// free tree
void dropBSTree (InvertedIndexBST t)
{
    if (t == NULL)
        return;
    
    dropBSTree (t->left);
    dropBSTree (t->right);
    free (t);
}

// code from lab
// write output into specific file
void showBSTreeNode (InvertedIndexBST t,FILE *f)
{
    if (t == NULL) return;
    fprintf(f,"%s ",t->word);
    ShowList (t->fileList,f);
    fprintf(f,"\n");
}

// code from lab
// printf infix order for tree
void BSTreeInfix (InvertedIndexBST t,FILE *f)
{
    if (t == NULL) return;
    
    BSTreeInfix (t->left,f);
    showBSTreeNode (t,f);
    BSTreeInfix (t->right,f);
}

// count the total of node in tree
int CountBSTreeNode (InvertedIndexBST t) {
    if (t == NULL) return 0;
    return 1 + CountBSTreeNode(t->left) + CountBSTreeNode(t->right);
    
}

// calculcate the tf value
void Calculata_tf_value (InvertedIndexBST t,int count, char *filename) {
    if (t == NULL) return;

    FileList same = NULL;
    same = Move_Same_Node (t->fileList, filename);
    
    if (same != NULL) {
        same->tf = same->tf/count;
    }
    //printf("2\n");
    Calculata_tf_value (t->left,count,filename);
    Calculata_tf_value (t->right,count,filename);
}

// code from lab
// purpose: find tree
// if the node has been in tree, return it
// otherwise return NULL
InvertedIndexBST FindTreeNode (InvertedIndexBST t, char *str) {
    
    if (t == NULL) return NULL;
    
    else if (strcmp(str, t->word) < 0)
        return FindTreeNode (t->left, str);
    else if (strcmp(str, t->word) > 0)
        return FindTreeNode (t->right, str);
    else 
        return t;
}

