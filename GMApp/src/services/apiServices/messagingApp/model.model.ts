export class MessagingRoomVM{
    public ID:string;
    public Name:string;
    constructor(){
        this.ID="";
        this.Name="";
    }
    set(object){
        this.ID=object.ID;
        this.Name=object.Name
    }
    set1(id:string, name:string){
        this.ID=id;
        this.Name=name;
    }
}
export class MessagingRoomParticipantsVM{
    public ID:string;
    public UserID:string;
    public RoomID:string;
    constructor(){
        this.ID="";
        this.UserID="";
        this.RoomID="";
    }
    set(object){
        this.ID=object.ID;
        this.UserID=object.UserID;
        this.RoomID=object.RoomID;
    }
}
export class MessagingConversationVM{
    public ID:string;
    public Text:string;
    public MessageType:string;
    public SenderID:string;
    public RoomID:string;
    public CreatedAt:string;
    constructor(){
        this.ID="";
        this.Text="";
        this.MessageType="";
        this.SenderID="";
        this.RoomID="";
        this.CreatedAt="";
    }
    set(object){
        this.ID=object.ID;
        this.Text=object.Text;
        this.MessageType=object.MessageType;
        this.SenderID=object.SenderID;
        this.RoomID=object.RoomID;
        this.CreatedAt=object.CreatedAt;
    }
}