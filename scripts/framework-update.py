#!/usr/bin/python
import requests, zipfile, io
import libs.path as path
import time

completeTask = 0
totalTask = 0
try:
    print("Preparing")
    time.sleep(1)
    rootDir = f"{path.rootPath(None)}"
    rootPath = f"{path.rootPath(None)}\\update"
    directoryName = f"node-api-framework-main"
    path.deleteFolder(rootPath)

    github = "https://github.com/AomDEV/node-api-framework/archive/refs/heads/main.zip"
    print(f"Downloading")
    time.sleep(1)
    totalTask+=1
    # Download Zip file
    r = requests.get(github)
    z = zipfile.ZipFile(io.BytesIO(r.content))
    ###################
    completeTask+=1
    print("Unziping packages")
    time.sleep(1)
    totalTask+=1
    # Extract Zip file
    z.extractall(rootPath)
    ###################
    completeTask+=1
    print("Installing packages")
    time.sleep(1)
    totalTask+=1
    # Install Package
    path.moveFiles(f"{rootPath}\\{directoryName}", f"{rootDir}")
    ###################
    completeTask+=1
    print("Removing cache")
    time.sleep(1)
    totalTask+=1
    # Remove packages
    result = path.deleteFolder(rootPath)
    ###################
    completeTask+=1
    if(result): 
        print("Removed packages cache")
    else:
        print("Remove packages cache failure")
except:
    path.deleteFolder(rootPath)
    print(f"Unable to update packages")
finally:
    print(f"Complete {completeTask}/{totalTask} task")
    if(completeTask >= totalTask):
        print(f"UPDATE COMPLETED")
    else:
        print(f"UPDATE FAILED")