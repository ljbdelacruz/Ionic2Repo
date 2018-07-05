import {UsersViewModel} from '../../../model/model.model'
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
}
export class CloudMessagingReceipentVM{
    public ID:string;
    public UserID:string;
    public CloudMessagingConversationID:string;
    public RoomID:string;
    public Message:CloudMessagingConversationVM;
    constructor(){
        this.ID="";
        this.UserID="";
        this.CloudMessagingConversationID="";
        this.RoomID="";
        this.Message=new CloudMessagingConversationVM();
    }
    set(object){
        this.ID=object.ID;
        this.UserID=object.UserID;
        this.CloudMessagingConversationID=object.CloudMessagingConversationID;
        this.RoomID=object.RoomID;
    }
    set1(id:string, uid:string, cmcID:string, roomID:string){
        this.ID=id;
        this.UserID=uid;
        this.CloudMessagingConversationID=cmcID;
        this.RoomID=roomID;
    }
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
}
//this model is handling for the failed sending of message receipent for certains 
//participants
export class TaskFailedMessage{
    public participant:CloudRoomParticipantsVM;
    public message:CloudMessagingConversationVM;
    constructor(){}
    set(p:CloudRoomParticipantsVM, m:CloudMessagingConversationVM){
        this.participant=p;
        this.message=m;
    }
}



