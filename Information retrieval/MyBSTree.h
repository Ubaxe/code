//
//  MyBSTree.h
//  invertedIndex
//
//  Created by Dylan on 3/7/19.
//  Copyright © 2019 Dylan. All rights reserved.
//

#ifndef MyBSTree_h
#define MyBSTree_h

#include <stdio.h>
#include "invertedIndex.h"


InvertedIndexBST BSTreeInsert (InvertedIndexBST t, char *str,char *filename);

void dropBSTree (InvertedIndexBST t);

void showBSTreeNode (InvertedIndexBST t,FILE *f);

void BSTreeInfix (InvertedIndexBST t,FILE *f);

int CountBSTreeNode (InvertedIndexBST t);

void Calculata_tf_value (InvertedIndexBST t,int count,char *filename);

InvertedIndexBST FindTreeNode (InvertedIndexBST t, char *str);
#endif /* MyBSTree_h */

