//
//  TfIdfList.h
//  invertedIndex
//
//  Created by Dylan on 5/7/19.
//  Copyright © 2019 Dylan. All rights reserved.
//

#ifndef TfIdfList_h
#define TfIdfList_h

#include <stdio.h>

#include "invertedIndex.h"


void FreeTfIdfList (TfIdfList node);

TfIdfList TfIdfListInsertInOrder (TfIdfList node, char *str,double TfIdf);

void ShowTfIdfList (TfIdfList node);

TfIdfList FindNodeSameValueEnd (TfIdfList node, char *str,double TfIdf);

void FindSameFileName (TfIdfList node, char *str,double TfIdf);

TfIdfList TfIdfListInsertSummation (TfIdfList node, char *str,double TfIdf);

TfIdfList TfIdfListSort (TfIdfList L1,TfIdfList L2);

TfIdfList MoveEnd (TfIdfList node);

int CheckSameNode (TfIdfList node, char *str);

void for_test_print_node(TfIdfList node);
#endif /* TfIdfList_h */

