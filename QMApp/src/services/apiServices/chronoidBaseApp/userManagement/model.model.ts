import {PositionViewModel} from '../../geoperson/locationTracking/model.model'
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
    public ProfileImage:string;
    public isAllowAccess:boolean=false;
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
        this.ProfileImage="";
        this.isAllowAccess=false;
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
            this.isAllowAccess=object.isAllowAccess!=undefined?object.isAllowAccess:false;
        }
    }
    setFB(object){
        if(object!=null){
            this.Firstname=object.Firstname;
            this.Lastname=object.Lastname;
            this.ProfileImage=object.ProfileImage;
            this.Password="facebookGEO";
            this.EmailAddress=object.EmailAddress;
        }
    }
    empty(){
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
        this.ProfileImage="";
        this.isAllowAccess=false;
    }
}

export class UserAccessLevelVM{
    public ID:string;
    public UserID:string;
    public AccessLevelID:string;
    set(object:any){
        if(object!=null){
            this.ID=object.ID;
            this.UserID=object.UserID;
            this.AccessLevelID=object.AccessLevelID;
        }
    }
    empty(){
        this.ID="";
        this.UserID="";
        this.AccessLevelID="";
    }
}
export class AccessLevelVM{
    public Name:string;
    constructor(){
        this.Name="";
    }
    set(object){
        if(object !=null){
          this.Name=object.Name;
        }
    }
    empty(){
        this.Name="";
    }
}
