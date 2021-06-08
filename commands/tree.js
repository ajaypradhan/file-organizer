function treeFn(dirPath) {
    if (dirPath == undefined) {
        // console.log("Kindly enter the correct path");
        treeHelper(process.cwd(), "");
        return;
    } else {
        let doesExist = fs.existsSync(dirPath);
        if (doesExist) {
            treeHelper(dirPath, "");
        } else {
            console.log("Kindly enter the path");
            return;
        }
    }
}

function treeHelper(dirPath, indent) {
    //is file or folder
    let isFile = fs.lstatSync(dirPath).isFile();
    //if file print
    if(isFile == true){
        let fileName  = path.basename(dirPath);
        console.log(indent + "|------" + fileName);
    }else{
        let dirName = path.basename(dirPath)
        console.log(indent + "|______"+ dirName);
        let children =fs.readdirSync(dirPath)
        for(let i = 0; i < children.length; i++){
            let childPath = path.join(dirPath,children[i]);
            treeHelper(childPath,indent+"\t");
        }
    }
    // if folder go into the folder

}
module.exports = {
    treeKey:treeFn
}