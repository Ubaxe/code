//
//  Mylist.h
//  invertedIndex
//
//  Created by Dylan on 1/7/19.
//  Copyright © 2019 Dylan. All rights reserved.
//

#ifndef Mylist_h
#define Mylist_h

#include <stdio.h>
#include "invertedIndex.h"


void FreeFileListNode (FileList node);

FileList FileListInsertInOrder (FileList node, char *str);

FileList Move_Same_Node (FileList node, char *str);

int list_length (FileList node);

int check_same_node (FileList node, char *str);

void ShowList (FileList node,FILE *f);
#endif /* Mylist_h */

