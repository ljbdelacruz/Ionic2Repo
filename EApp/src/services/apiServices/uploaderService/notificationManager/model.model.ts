export class NotificationManagerVM{
    public ID:string;
    public Title:string;
    public Message:string;
    public UID:string;
    constructor(){
        this.ID="";
        this.Message="";
        this.UID="";
    }
    set(object){
        this.ID=object.ID;
        this.Message=object.Message;
        this.UID=object.UID;
    }
    empty(){
        this.ID="";
        this.Message="";
        this.UID="";
    }
}