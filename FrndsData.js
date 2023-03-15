class FrndData{
    constructor(){
        this._categories=[
            new  Category(1,"Ahmed","090078601","26-05-2023","Evs_Group"),
            new  Category(2,"Atif","030308601","25-02-2023","Mern_stack"),
            new  Category(3,"Mariyamy","030405032","2-09-2023","System_Group")
        ];
        this._subCategories=[
            new SubCategory(1,"Evs_Group",this._categories[0]),
            new SubCategory(2,"Mern_stack",this._categories[1]),
            new SubCategory(3,"System_Group",this._categories[2]),
        ];
    }

    AddCategory(c){
        this._categories.push(c);
        return c;
    }

    UpdateCategory(id,c){
        let index = this._categories.findIndex(c=>c.Id==id);
        if(index>=0){
            this._categories[index]=c;
            return this._categories[index];
        }
        return null;
    }

    DeleteCategory(id){
        let index = this._categories.findIndex(c=>c.Id==id);
        if(index>=0){
            const temp = this._categories[index];
            this._categories.splice(index,1);
            return temp; 
        }
        return null;
    }

    GetCategory(id){
        return this._categories.find(c=>c.Id==id);
    }

    GetCategories(){
        let temp = [...this._categories];
        return temp;
    }

    GetSubCategories(c){
        if(c){
            return  this._subCategories.filter(
                x=> x.Parent.Id == c.Id);
        }
        else{
            let temp =[...this._subCategories];
            return temp;
        }
    }
}

class Category{
    constructor(id,name,cellno,dtbirth,group){
        this.Id = id;
        this.Name = name;
        this.CellNo = cellno;
        this.DtBirth = dtbirth;
        this.Group  = group;
    }
    get Summary(){
        return `${this.Id},${this.Name},${this.CellNo},${this.DtBirth},${this.Group}`;
    }
}

class SubCategory{
    constructor(id,name,cellno,dtbirth,group,parent){
        this.Id = id;
        this.Name = name;
        this.CellNo = cellno;
        this.DtBirth = dtbirth;
        this.Group = group;
        this.Parent = parent;
    }
    get Summary(){
        return `${this.Id},${this.Name},${this.CellNo},${this.DtBirth},${this.Group},${this.Parent.Name}`;
    }
}


module.exports= {    
    FrndData,
    Category,
    SubCategory
}