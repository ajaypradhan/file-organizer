function organizeFn(dirPath) {
    // 1. input -> directory path
    let destPath;
    if (dirPath == undefined) {
        // console.log("Kindly enter the correct path");
         destPath = process.cwd()
        return;
    } else {
        let doesExist = fs.existsSync(dirPath);
        if (doesExist) {
            // 2. creat -> organized folder -> directory
            destPath = path.join(dirPath, "organized_files");
            if (fs.existsSync(destPath) == false) {
                fs.mkdirSync(destPath);
                console.log("organized folder created");
            }
        } else {
            console.log("Kindly enter the path");
            return;
        }
    }
    organizeHelper(dirPath, destPath);

}


function organizeHelper(src, dest) {
    // 3. identify the category of all the files in the input directory
    let childNames = fs.readdirSync(src);
    // console.log(childNames);
    for (let i = 0; i < childNames.length; i++) {
        let childAddress = path.join(src, childNames[i]);
        let isFile = fs.lstatSync(childAddress).isFile();
        if (isFile) {
            // console.log(childNames[i]);
            let category = getCategory(childNames[i]);
            console.log(childNames[i], " belong to -->  ", category);
            // 4. copy /  cut files to that organized directory inside of any category folder
            sendFiles(childAddress, dest, category);
        }
    }
}

function getCategory(name) {
    let ext = path.extname(name);
    ext = ext.slice(1);
    // console.log(ext);
    for (let type in types) {
        let cTypeArray = types[type];
        for (let i = 0; i < cTypeArray.length; i++) {
            if (ext == cTypeArray[i]) {
                return type;
            }
        }
    }
    return "other";
}

function sendFiles(srcFilePath, dest, category) {
    let categoryPath = path.join(dest, category);
    if (fs.existsSync(categoryPath) == false) {
        fs.mkdirSync(categoryPath);
    }
    let fileName = path.basename(srcFilePath)
    let destFilePath = path.join(categoryPath, fileName);
    fs.copyFileSync(srcFilePath, destFilePath);
    fs.unlinkSync(srcFilePath);
    console.log(fileName, "copied to ", category);
}

module.exports = {
    organizeObj:organizeFn
}