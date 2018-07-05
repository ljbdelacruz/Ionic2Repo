export class PositionViewModel{
    public longitude:number;
    public latitude:number;
    constructor(){
        this.longitude=0;
        this.latitude=0;
    }
    set(long:number, lat:number){
        this.longitude=long;
        this.latitude=lat;
    }
}
export class UserSettingsVM{
    public UserID:string;
    public AccessLevelID:string;
    public JoinedOn:string;
    public ProfileImage:string;
    constructor(){
        this.UserID="";
        this.AccessLevelID="";
        this.JoinedOn="";
        this.ProfileImage="";
    }
    set(object:any){
        this.UserID=object.UserID;
        this.AccessLevelID=object.AccessLevelID;
        this.JoinedOn=object.JoinedOn;
    }
}
export class UsersViewModel{
    public ID:string;
    public Firstname:string;
    public Middlename:string;
    public Lastname:string;
    public EmailAddress:string;
    public ContactNumber:string;
    public Password:string;
    public Repassword:string;
    public location:PositionViewModel;
    public Address:string;
    public isClient:boolean;
    public CompanyID:string;
    public UserSetting:UserSettingsVM;
    public ProfileImage:string;
    constructor(){
        this.ID="";
        this.Firstname="";
        this.Middlename="";
        this.Lastname="";
        this.EmailAddress="";
        this.ContactNumber="";
        this.Password="";
        this.Repassword="";
        this.location=new PositionViewModel();
        this.Address="";
        this.isClient=true;
        this.UserSetting=new UserSettingsVM();
        this.ProfileImage="";
    }
    set(object){
        if(object != null || object != undefined){
            this.ID=object.ID;
            this.Firstname=object.Firstname;
            this.Middlename=object.MiddleName;
            this.Lastname=object.Lastname;
            this.EmailAddress=object.EmailAddress;
            this.ContactNumber=object.ContactNumber;
            this.isClient=object.isClient;
            this.CompanyID = object.Member!=null?object.Member.ID:null;
            this.ProfileImage=object.ProfileImage!=undefined?object.ProfileImage:"";
        }
    }
    setFB(object){
        this.Firstname=object.Firstname;
        this.Lastname=object.Lastname;
        this.ProfileImage=object.ProfileImage;
        this.Password="facebookGEO";
        this.EmailAddress=object.EmailAddress;
    }
}

export class ItemVM{
    public ID:string;
    public Title:string;
    public Description:string;
    public Price:number;
    public OwnerID:string;
    public Owner:UsersViewModel;
    public ItemImages:ItemImageVM[]=[];
    public PostType:number;
    public isArchived:boolean;
    public UpdatedAt:string;
    public Categories:ItemCategoryVM[]=[];
    constructor(){
        this.ID="";
        this.Title="";
        this.Description="";
        this.Price=0;
        this.Owner=new UsersViewModel();
        this.ItemImages=[];
        this.PostType=0;
        this.isArchived=false;
    }
    set(object:any){
        this.ID=object.ID;
        this.Title=object.Title;
        this.Description=object.Description;
        this.Price=object.Price;
        this.PostType=object.PostType;
        this.OwnerID=object.OwnerID;
        this.UpdatedAt=object.UpdatedAt;
        this.isArchived=object.isArchived;
    }
}
export class ItemImageVM{
    public ID:string;
    public Source:string;
    constructor(){
        this.ID="";
        this.Source="";
    }
    set(object){
        this.ID=object.ID;
        this.Source=object.Source;
    }
    setManual(id:string, source:string){
        this.ID=id;
        this.Source=source;
    }
}
export class ItemCategoryVM{
    public ID:string;
    public Name:string;
    public SubCategories:ItemSubCategoryVM[]=[];
    constructor(){
        this.ID="";
        this.Name="";
        this.SubCategories=[];
    }
    set(object:any){
        this.ID=object.ID;
        this.Name=object.Name;
    }
}
export class ItemSubCategoryVM{
    public ID:string;
    public Name:string;
    public Category:string;
    constructor(){
        this.ID="";
        this.Name="";
        this.Category="";
    }
    set(object:any){
        this.ID=object.ID;
        this.Name=object.Name;
        this.Category=object.Category;
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
}
export class UserReviewVM{
    public ID:string;
    public Comment:string;
    public UserID:string;
    public SenderID:string;
    public SenderInfo:UsersViewModel;
    public Stars:number[];
    public StarsCount:number;
    public API:string;
    constructor(){
        this.ID="";
        this.Comment="";
        this.UserID="";
        this.SenderID="";
        this.SenderInfo=new UsersViewModel();
        this.Stars=[];
        this.StarsCount=0;
        this.API="";
    }
    set(object){
        this.ID=object.ID;
        this.Comment=object.Comment;
        this.UserID=object.UserID;
        this.SenderID=object.SenderID;
        this.Stars=Array(object.Stars).fill(1).map((x,i)=>i);
        this.StarsCount=object.Stars;
    }
    FillStars(num){
        console.log("Filling Stars");
        console.log(num);
        this.Stars=[];
        this.Stars=Array(num).fill(num).map((x,i)=>i);
        console.log(this.Stars);
    }
}




