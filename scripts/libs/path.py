#!/usr/bin/python
import pathlib
import os
import sys
import shutil

def rootPath(defaultRoot = "src"):
    rawPath = f"{(pathlib.Path(__file__).parent.resolve())}"
    rootPath = rawPath.replace("\\scripts\\libs", "")
    if(defaultRoot == None or len(defaultRoot) <= 0):
        return f"{rootPath}"
    else:
        return f"{rootPath}\\{defaultRoot}"

def deleteFolder(path):
    try:
        shutil.rmtree(path)
        return True
    except OSError as e:
        return False

def moveFiles(source, dest):
    file_names = os.listdir(source)
    complete = 0
    for file_name in file_names:
        shutil.move(os.path.join(source, file_name), dest)
        complete+=1
    return complete