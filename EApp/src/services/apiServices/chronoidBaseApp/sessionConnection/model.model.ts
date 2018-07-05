export class MyConnectionVM{
    public ID:string;
    constructor(){
        this.ID="";
    }
    set(object){
        this.ID=object.ID;
    }
    empty(){
        this.ID="";
    }
}
export class MyConnectionMemberVM{
    public ID:string;
    public UserID:string;
    public DateJoined:string;
    constructor(){
        this.ID="";
        this.UserID="";
        this.DateJoined="";
    }
    set(object){
        this.ID=object.ID;
        this.UserID=object.UserID;
        this.DateJoined=object.DateJoined;
    }
    empty(){
        this.ID="";
        this.UserID="";
        this.DateJoined="";
    }
}