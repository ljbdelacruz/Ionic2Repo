export class PositionViewModel{
    public longitude:number;
    public latitude:number;
    constructor(long, lat){
        this.longitude=long;
        this.latitude=lat;
    }
}
export class UserPositionViewModel extends PositionViewModel{
    public ID:string;
    setVM(data){
        this.ID=data.ID;
        this.longitude=data.longitude;
        this.latitude=data.latitude;
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
    constructor(){
        this.ID="";
        this.Firstname="";
        this.Middlename="";
        this.Lastname="";
        this.EmailAddress="";
        this.ContactNumber="";
        this.Password="";
        this.Repassword="";
        this.location=new PositionViewModel(0,0);
        this.Address="";
        this.isClient=true;
    }
    set1(id, firstname, middlename, lastname, emailAddress, contactNumber, password, repassword){
        this.ID=id;
        this.Firstname=firstname;
        this.Middlename=middlename;
        this.Lastname=lastname;
        this.EmailAddress=emailAddress;
        this.ContactNumber=contactNumber;
        this.Password=password;
        this.Repassword=repassword;
        this.location=new PositionViewModel(0,0);
    }
    set(object:UsersViewModel){
        this.ID=object.ID;
        this.Firstname=object.Firstname;
        this.Middlename=object.Middlename;
        this.Lastname=object.Lastname;
        this.EmailAddress=object.EmailAddress;
        this.ContactNumber=object.ContactNumber;
        this.Password=object.Password;
        this.Repassword=object.Repassword;
    }
    setVM(object){
        this.ID=object.ID;
        this.Firstname=object.Firstname;
        this.Middlename=object.MiddleName;
        this.Lastname=object.Lastname;
        this.EmailAddress=object.EmailAddress;
        this.ContactNumber=object.ContactNumber;
        this.isClient=object.isClient;
    }
}
//travelog description
export class VloggerDescriptionViewModel{
    public ID:string;
    public UID:string;
    public Name:string;
    public profileImage:string;
    constructor(){
        this.ID="";
        this.UID="";
        this.Name="";
        this.profileImage="";
    }
    set(object:any){
        this.ID=object.ID;
        this.UID=object.UID;
        this.Name=object.Name;
        this.profileImage=object.profileImage;
    }
}
export class VlogConnection{
    public ID:string;
    public Title:string;
    public DateUpdated:Date;
    public Introduction:string;
    public Country:string;
    public Owner:VloggerDescriptionViewModel;
    public SegmentDescription:VlogSegmentDescription[]=[];
    constructor(){
        this.ID="";
        this.Title="";
        this.Introduction="";
        this.Country="";
        this.Owner=new VloggerDescriptionViewModel();
    }
    set(object){
        this.ID=object.ID;
        this.Title=object.Title;
        this.Owner.set(object.Owner);
    }

}
export class VlogSegmentDescription{
    public ID:string;
    public Text:string;
    public Type:VlogSegmentDescriptionType;
    public Media:VlogSegmentDescriptionMedia[]=[];
    public Location:VlogSegmentLocationVM;
    public displayOrder:number;
    constructor(id:string, text:string, type:VlogSegmentDescriptionType, Images:VlogSegmentDescriptionMedia[], displayOrder:number){
        this.ID=id;
        this.Text=text;
        this.Type=type;
        this.Media=Images;
        this.displayOrder=displayOrder;
        this.Location=new VlogSegmentLocationVM();
    }
}
//type
export class VlogSegmentDescriptionType{
    public ID:string;
    public Description:string;
    constructor(id:string, description:string){
        this.ID=id;
        this.Description=description;
    }
}
export class VlogSegmentDescriptionMedia{
    public ID:string;
    public Source:string;
}
export class VlogSegmentLocationVM{
    public ID:string;
    public longitude:number;
    public latitude:number;
    constructor(){
        this.ID="";
        this.longitude=0;
        this.latitude=0;
    }
    set(object:any){
        this.ID=object.ID;
        this.longitude=Number(object.longitude);
        this.latitude=Number(object.latitude);
    }
}

//base context
export class Country{
    public ID:string;
    public Name:string;
    set(object){
        this.Name = object.name;
    }
}







