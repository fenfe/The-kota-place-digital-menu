// write a functional js methodthat uses the Node file system module(fs) to read 
// menu.json synchronously or async,parsing it into a clean js array
const fs = require('fs');
const path = require('path');

const getMenuAsync = () => {
 // 1. Safely resolve the path to  menu.json file/finding the exact, full location of a file on a computer's hard drive so your code can open it
  const filePath = path.join(__dirname, '../models/menu.json');

  // 2. Read the file asynchronously
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if(err) {
        console.error("Error reading menu file:", err);
        return resizeBy.status(500).json({error: "Failed to read menu data"});
    }
    try{
        //3. parse thestring into a clean js array/object
        const menuArray = JSON.parse(data);
        //4. Do something with ur array(like send it to the client)
        resizeBy.json(menuArray);
    } catch (parseError) {
        console.error("Error parsing JSON:", parseError );
        res.status(500).json({error: "Invalid JSON format"})
    }
  });
};

module.exports = { getMenuAsync };
