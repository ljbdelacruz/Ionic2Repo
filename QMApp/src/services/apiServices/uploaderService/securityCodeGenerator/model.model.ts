export class SecurityCodeVM{
    public ID:string;
    public API:string;
    public Code:string;
    public OwnerID:string;
    constructor(){
        this.ID="";
        this.API="";
        this.Code="";
        this.OwnerID="";
    }
    set(object){
        this.ID=object.ID;
        this.API=object.API;
        this.Code=object.Code;
        this.OwnerID=object.OwnerID;
    }
    empty(){
        this.ID="";
        this.API="";
        this.Code="";
        this.OwnerID="";
    }

}