export class DateTimeVM{
    public Day:number;
    public Month:number;
    public Year:number;
    constructor(){
        this.Day=0;
        this.Month=0;
        this.Year=0;
    }
}

export class MessagingRoomVM{
    public ID:string;
    public Name:string;
    constructor(){
        this.ID="";
        this.Name="";
    }
    set(obj){
        this.ID=obj.ID;
        this.Name=obj.Name;
    }
    empty(){
        this.ID="";
        this.Name="";
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
    set(obj){
        this.ID=obj.ID;
        this.UserID=obj.UserID;
        this.RoomID=obj.RoomID;
    }
    empty(){
        this.ID="";
        this.UserID="";
        this.RoomID="";
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
    set(obj){
        this.ID=obj.ID;
        this.Text=obj.Text;
        this.MessageType=obj.MessageType;
        this.SenderID=obj.SenderID;
        this.RoomID=obj.RoomID;
        this.CreatedAt=obj.CreatedAt;
    }
    empty(){
        this.ID="";
        this.Text="";
        this.MessageType="";
        this.SenderID="";
        this.RoomID="";
        this.CreatedAt="";
    }
}