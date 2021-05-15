//  Created by Dylan on 1/7/19.
//  Copyright © 2019 Dylan. All rights reserved.
//

#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include <stdlib.h>
#include <math.h>
#include "MyBSTree.h"
#include "Mylist.h"
#include "TfIdfList.h"

char * normaliseWord(char *str);
int check_punctuation(char ch);
int ValidFile (FILE *f);
int cal_file_num (char *collectionFilename);

/*
int main (void) {
    InvertedIndexBST t = generateInvertedIndex("collection.txt");
    //printInvertedIndex (t);
    //char *arr[] = {"design","moon","and","mars","weather",NULL};
    int num = cal_file_num ("collection.txt");
    TfIdfList tfidf = calculateTfIdf(t,"sun", num);
    //TfIdfList retrieve_list = retrieve(t,  arr, num);
    ShowTfIdfList (tfidf);
    //ShowTfIdfList (retrieve_list);
    dropBSTree(t);
    return 0;
}
*/

// This function purpose is that we can easily use the total number of files in other files or function. Return is total amount of files
int cal_file_num (char *collectionFilename) {
    int num = 0;
    FILE *col = fopen (collectionFilename,"r");
    char *col_file = malloc (sizeof(char) *100);
    if (ValidFile(col)) {
        while (fscanf(col,"%s",col_file)!= EOF) {
            num++;
        }
    }
    fclose(col);
    free(col_file);
    return num;
}

// open collectionFilename to read file names
// then open each file name to read content from each file
// then insert word into tree and insert file name into node's file list if it really written in file
InvertedIndexBST generateInvertedIndex(char *collectionFilename) {
    FILE *col = fopen (collectionFilename,"r");
    char *col_file = malloc (sizeof(char) *100); // read collection.txt file name
    char *w = malloc(sizeof(char) *100);
        // w stand for every word in single txt
    InvertedIndexBST t = NULL;
    if (ValidFile(col)) {
        while (fscanf(col,"%s",col_file)!= EOF) {
            FILE *file = fopen(col_file , "r");
            int count = 0;
            if (ValidFile(file)) {
            while (fscanf(file,"%s",w)!= EOF){
                w = normaliseWord(w);
                t = BSTreeInsert (t,w,col_file);
                count++;
            }
            Calculata_tf_value (t,count,col_file);
            fclose(file);
        }
    }
    }
    fclose(col);
    free(w);
    free(col_file);
    return t;
}

// used formula from website to calculate specific word's tf value, idf and tfidf
TfIdfList calculateTfIdf(InvertedIndexBST tree, char *searchWord , int D) {
    TfIdfList tfid_list = NULL;
    searchWord = normaliseWord(searchWord);
    InvertedIndexBST t = FindTreeNode(tree, searchWord);
    double idf = 0;
    if (t != NULL) {
        FileList curr = t->fileList;
        double len = list_length(t->fileList);
        idf = log10(D/len);
        double tf_idf = 0;
        while (curr != NULL) {
            tf_idf = curr->tf * idf;
            tfid_list = TfIdfListInsertInOrder (tfid_list, curr->filename,tf_idf);
            curr = curr ->next;
        }
    }
    return tfid_list;
}

// used formula from website to calculate tf value, idf and tfidf of array of word.
TfIdfList retrieve(InvertedIndexBST tree, char* searchWords[] , int D) {
    TfIdfList list = NULL;
    TfIdfList retrieve_list = NULL;
    for (int i = 0; searchWords[i] != NULL; i++) {
        //printf("%s\n",searchWords[i]);
        searchWords[i] = normaliseWord(searchWords[i]);
        InvertedIndexBST t = FindTreeNode(tree, searchWords[i]);
        double idf = 0;
        if (t != NULL) {
            FileList curr = t->fileList;
            double len = list_length(t->fileList);
            idf = log10(D/len);
            double tf_idf = 0;
            while (curr != NULL) {
                tf_idf = curr->tf * idf;
                list = TfIdfListInsertSummation (list, curr->filename,tf_idf);
                curr = curr ->next;
            }
        }
        
        
    }
    
    retrieve_list = TfIdfListSort (list,retrieve_list);
    FreeTfIdfList (list);
    return retrieve_list;
}

// write output for InvertedIndex into invertedIndex.txt
void printInvertedIndex(InvertedIndexBST tree) {
    char *filename = "invertedIndex.txt";
    FILE *f = fopen (filename,"w");
    if (ValidFile(f)) {
        BSTreeInfix (tree,f);
    }
    fclose(f);
}


// The purpose of this function check a Valid file, if this file does not exist in directory, it will show error message.
int ValidFile (FILE *f) {
    if (f == NULL) {
        fprintf(stderr, "The file can not open\n");
        return 0;
    } else {
        return 1;
    }
}

// normalse string which passes into function
char *normaliseWord(char *str) {
    for (int i = 0; i <strlen(str); i++) {
        if (check_punctuation(str[i]) == 1 && str[i+1] == '\0') {
            str[i] = '\0';
        } else if (isupper(str[i]) != 0) {
            str[i] = tolower(str[i]);
        }
    }
    return str;
}

// check the string whether has any punctuations
int check_punctuation(char ch) {
    
    char dot = '.';
    char comma = ',';
    char semi =';';
    char ques_mark = '?';
    
    if (ch == dot || ch == comma || ch == semi || ch == ques_mark ) return 1;
    
    return 0;
}

