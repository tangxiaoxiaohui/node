const fs = require("fs");
const path = require("path");
const rootDir = path.resolve(__dirname);

const createDirTree = (dir,skip) => {

    console.log('+—— root');
    const recur = (curDir) => {
        fs.readdirSync(curDir,{withFileTypes:true}).forEach((value) => {
            if(skip.includes(value.name)) return ;
            const childPath = path.join(curDir,value.name); 
            const depths = childPath.replace(rootDir,'').split(path.sep).filter(Boolean).length ;
            const isDirectory = value.isDirectory();
            const prefix = `${'| '.repeat(depths -1)}${ isDirectory ? '+' : '`' }-- `; 
            console.log(`${prefix}${value.name}`);
            if(isDirectory){
            recur(path.join(curDir,value.name));
            }
        });
    }
    recur(dir);
}

createDirTree(rootDir,["node_modules",".vscode",".git",".idea","dist",".next","_next"])