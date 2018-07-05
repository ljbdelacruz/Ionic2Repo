export class NotificationManagerVM{
    public ID:string;
    public Title:string;
    public Text:string;
    public UID:string;
    constructor(){
        this.ID="";
        this.Title="";
        this.Text="";
    }
    set(object){
        this.ID=object.ID;
        this.Text="";
        this.Title="";
    }
    set1(id:string, title:string, text:string){
        this.ID=id;
        this.Title=title;
        this.Text=text;
    }
}