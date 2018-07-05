export class StatusTypeReferenceVM{
    public Name:string;
    public Description:string;
    constructor(){
        this.Name="";
        this.Description="";
    }
    set(object){
        this.Name=object.Name;
        this.Description=object.Description;
    }
    empty(){
        this.Name="";
        this.Description="";
    }
}
