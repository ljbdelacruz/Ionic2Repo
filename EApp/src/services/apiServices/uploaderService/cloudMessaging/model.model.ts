import {UsersViewModel} from '../../chronoidBaseApp/userManagement/model.model'
export class CloudMessagingRoomVM{
    public ID:string;
    public RoomName:string;
    public Participants:UsersViewModel[]=[];
    public Messages:CloudMessagingConversationVM[]=[];
    public NewMessagesCount:number=0;
    constructor(){
        this.ID="";
        this.RoomName="";
    }
    set(object:any){
        this.ID=object.ID;
        this.RoomName=object.RoomName; 
    }
    empty(){
        this.ID="";
        this.RoomName="";
    }
}
export class CloudMessagingConversationVM{
    public ID:string;
    //id which identifies room where this message belongs to
    public RoomConversation:string;
    public MessageType:string;
    public Text:string;
    public isSync:boolean;
    public CreatedAt:string;
    public SenderID:string;
    constructor(){
        this.ID="";
        this.RoomConversation="";
        this.MessageType="";
        this.Text="";
        this.isSync=false;
        this.CreatedAt="";
        this.SenderID="";
    };
    set(object:any){
        this.ID=object.ID;
        this.RoomConversation=object.RoomConversation;
        this.MessageType=object.MessageType;
        this.Text=object.Text;
        this.isSync=object.isSync;
        this.CreatedAt=object.CreatedAt;
        this.SenderID=object.SenderID;
    }
    empty(){
        this.ID="";
        this.RoomConversation="";
        this.MessageType="";
        this.Text="";
        this.isSync=false;
        this.CreatedAt="";
        this.SenderID="";
    };
}
export class CloudRoomParticipantsVM{
    public ID:string;
    public UserID:string;
    public RoomID:string;
    constructor(){
        this.ID="";
        this.UserID="";
        this.RoomID="";
    }
    set(object:any){
        this.ID=object.ID;
        this.UserID=object.UserID;
        this.RoomID=object.RoomID;
    }
    empty(){
        this.ID="";
        this.UserID="";
        this.RoomID="";
    }
}
export class CloudMessageReceipentVM{
    public ID:string;
    public UserID:string;
    public CloudMessagingConversationID:string;
    public RoomID:string;
    constructor(){
        this.ID="";
        this.UserID="";
        this.CloudMessagingConversationID="";
        this.RoomID="";
    }
    set(object){
        if(object != null){
            this.ID=object.ID;
            this.UserID=object.UserID;
            this.CloudMessagingConversationID=object.CloudMessagingConversationID;
            this.RoomID=object.RoomID;
        }
    }
    empty(){
        this.ID="";
        this.UserID="";
        this.CloudMessagingConversationID="";
        this.RoomID="";
    }

}