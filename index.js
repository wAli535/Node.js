const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
const {Category , SubCategory , FrndData} = require("./FrndsData");
const prompt = require("prompt");
const {Console} = require("console");
const  {type} = require("os");
const DataHandler = new FrndData();

displayMenu()
.then(function(result){
    console.log("done");
});

async function displayMenu(){
    let isContinue = true;
    while(isContinue){
        console.log(chalk.yellow("---------------------"));
        console.log(chalk.blue("MANAGE DATA OF FRNDS"));
        console.log(chalk.yellow("---------------------"));
        console.log("1. Add");
        console.log("2. Update");
        console.log("3. Delete");
        console.log("4. List All");
        console.log("5. Exit");

        prompt.start();
        const { choice } = await prompt.get("choice");
        switch (Number(choice)){
            case 1: 
            await addCategory();
            break;
            case 2: 
            await updateCategory();
            break;
            case 3: 
            await deleteCategory();
            break;
            case 4: 
            await showCategories();
            break;
        }
        let schema = {
            properties: {
                anykey: {
                    description: "Do you want to continue",
                    type:"String"
                },
            }
        };
        let {anykey} = await prompt.get(schema);
        if(anykey === "y"){
            console.clear();
        }
        else{
            isContinue = false;
            SaveData();
        }  
    }
}

async function SaveData(){
    let categories  = DataHandler.GetCategories();
    let temp = "";
    categories.forEach(function(c){
        let s =JSON.stringify(c) +"\n\r";
        temp+=s;
    });

    let filePath = path.resolve(__dirname,"mydata","categories.txt");
    await fs.writeFile(filePath,temp);
    console.log("data is written to file");
}

async function addCategory(){
    try{
        let schema = {
            properties:{
                id: {
                    description:"Entter Frnd id:",
                    type : "number"
                },
                name: {
                    description: "Enter Frnd name:",
                    type:"string"
                },
                cellno:{
                    description:"Enter Cell No:",
                    type:"number"
                },
                dtbirth:{
                    description:"Enter Date of Birth:",
                    type:"number"
                }
            }
        };
        prompt.start();
        const { id , name,cellno,dtbirth} =await prompt.get(schema)
        const c = new Category(id,name,cellno,dtbirth);
        DataHandler.AddCategory(c);
        console.log("Frnd Data is added");
    }
    catch(err){
        console.log(err);
    }
}
async function updateCategory(){
    try{
        let schema1 = {
            properties:{
                idToSearch:{
                    description:"Enter Frnd Id to search:",
                    type:"number"
                }
            }
        };
        prompt.start();
        const{idToSearch} = await prompt.get(schema1);
        console.log(`You Enter : ${idToSearch}`);
        let foundCategory = DataHandler.GetCategory(idToSearch);
        console.log(`Your required Frnd id is ${foundCategory.Summary}`);

        let schema2 = {
            properties:{
                name:{
                    description:"Enter Frnd Name:",
                    type:"string"
                },
                cellno:{
                    description:"Enter CELL NO:",
                    type:"number"
                },
                dtbirth:{
                    description:"Enter Date Of Birth:",
                    type:"number"
                }
            }
        };
        let {name , cellno , dtbirth} = await prompt.get(schema2);
        DataHandler.UpdateCategory(idToSearch, new Category(idToSearch,name,cellno,dtbirth));
        console.log(`Data is  updated`);
    }
    catch (err) {
        console.log(err);
    }
}

async function deleteCategory(){
    try{
        let schema1 = {
            properties: {
                idToSearch: {
                    description:"Enter Frndss Id to Search:",
                    type:"number"
                }   
            }
        };
        prompt.start();
        const {idToSearch} = await prompt.get(schema1);
        let foundCategory = DataHandler.GetCategory(idToSearch);
        
        let schema2 = {
            properties: {
                confirm : {
                    description:`Do you wants to delete category: ${foundCategory.Summary}`,
                    type:"string"
                }
            }
        };

        let {confirm} = await prompt.get(schema2);
        if(confirm ==="y"){
            DataHandler.DeleteCategory(idToSearch);
            console.log(`Fends Data is deleted`);
        }
        else{
            console.log(`Frnds data is not Deleted`);
        }
    }
    catch (err){
        console.log(err);
    }
}

async function showCategories(){
    try{
        let categories = DataHandler.GetCategories();
        categories.forEach(function(c){
            console.log(c);
        });
    }
    catch (err){
        console.log(err);
    }
}


