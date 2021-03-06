#!/usr/bin/python
from genericpath import isdir
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
    except:
        return False

def deleteFile(path):
    if os.path.exists(path):
        os.remove(path)
        return True
    return False

def ignoreList():
    return [".github", "update", "connection.prisma", ".env", "package-lock.json"]

def moveFiles(source, dest):
    file_names = os.listdir(source)
    complete = 0
    for file_name in file_names:
        sourceRaw = os.path.join(source, file_name)
        destRaw = os.path.join(dest, file_name)

        if(file_name in ignoreList() and os.path.exists(destRaw)):
            continue
        
        if os.path.isdir(sourceRaw) and os.path.exists(destRaw):
            moveFiles(sourceRaw, destRaw)
        else:
            shutil.move(sourceRaw, destRaw)

        complete+=1
    return complete