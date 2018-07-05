import { UsersViewModel } from "../../chronoidBaseApp/userManagement/model.model";

export class UserReviewVM{
    public ID:string;
    public Comment:string;
    public UserID:string;
    public UserInfo:UsersViewModel;
    public SenderID:string;
    public UpdatedAt:string;
    public Stars:number;
    public API:string;
    constructor(){
        this.ID="";
        this.Comment="";
        this.UserID="";
        this.UserInfo=new UsersViewModel();
        this.SenderID="";
        this.UpdatedAt="";
        this.Stars=0;
        this.API="";
    }
    empty(){
        this.ID="";
        this.Comment="";
        this.UserID="";
        this.UserInfo=new UsersViewModel();
        this.SenderID="";
        this.UpdatedAt="";
        this.Stars=0;
        this.API="";
    }
    set(object){
        if(object!=null){
            this.ID=object.ID;
            this.Comment=object.Comment;
            this.UserID=object.UserID;
            this.SenderID=object.SenderID;
            this.UpdatedAt=object.UpdatedAt;
            this.Stars=object.Stars;
            this.API=object.API;
        }
    }

}