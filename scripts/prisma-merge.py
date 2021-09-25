#!/usr/bin/python
import glob, os
import libs.path as path

print("Merging prisma schema")

try:
    rootPath = f"{path.rootPath('prisma')}"
    schemaPath = f"{rootPath}\\schema"
    os.chdir(schemaPath)
    schemaList = ""
    # Read prisma connection file content
    connectionPrisma = f"{rootPath}/connection.prisma"
    with open(connectionPrisma) as f:
        contents = f.read()
        schemaList = f"{contents}\n"
        print("Merged connection schema")

    # Read schema file contents
    schemaFileCount = 0
    for file in glob.glob("*.prisma"):
        schemaFile = f"{schemaPath}/{file}"
        with open(schemaFile) as f:
            contents = f.read()
            schemaList += f"\n{contents}"
            schemaFileCount += 1
            print(f"Reading `{file}`")

    # Write new schema.prisma
    schemaPrisma = f"{rootPath}/schema.prisma"
    with open(schemaPrisma, "r+") as f:
        f.write(schemaList)
        print(f"Merged {schemaFileCount} schema")

    print(f"Merge successfuly!")
except:
    print(f"Merge failure.")
