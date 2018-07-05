import { ImageLinkStorageVM } from "../../uploaderService/imageLinkStorage/model.model";
import { UserAccessLevelVM } from "../userManagement/model.model";

export class MyStoreVM{
    public ID:string;
    public UserID:string;
    public Name:string;
    public StoreCategoryID:string;
    public StoreBackgroundImageID:string="";
    public BackgroundImage:ImageLinkStorageVM;
    public StoreLogoID:string;
    public LogoImage:ImageLinkStorageVM;
    constructor(){
        this.ID="";
        this.UserID="";
        this.Name="";
        this.StoreCategoryID="";
        this.StoreBackgroundImageID="";
        this.StoreLogoID="";
        this.BackgroundImage=new ImageLinkStorageVM();
        this.LogoImage=new ImageLinkStorageVM();
    }
    empty(){
        this.ID="";
        this.UserID="";
        this.Name="";
        this.StoreCategoryID="";
        this.StoreBackgroundImageID="";
        this.StoreLogoID="";
        this.BackgroundImage=new ImageLinkStorageVM();
        this.LogoImage=new ImageLinkStorageVM();
    }
    set(object){
        if(object!=null){
            console.log(object);
            this.ID=object.ID;
            this.UserID=object.UserID;
            this.Name=object.Name;
            this.StoreCategoryID=object.StoreCategoryID;
            this.StoreBackgroundImageID=object.StoreBackGroundImageID;
            this.StoreLogoID=object.StoreLogoID;
        }
    }
}
export class StoreBranchVM{
    public ID:string;
    public StoreID:string;
    public AttendantID:string;
    public GeolocationID:string;
    public Address:string;
    constructor(){
        this.ID="";
        this.StoreID="";
        this.AttendantID="";
        this.GeolocationID="";
        this.Address="";
    }
    set(object){
     this.ID=object.ID;
     this.StoreID=object.StoreID;
     this.AttendantID=object.AttendantID;
     this.GeolocationID=object.GeolocationID;
     this.Address=object.Address;   
    }
    empty(){
        this.ID="";
        this.StoreID="";
        this.AttendantID="";
        this.GeolocationID="";
        this.Address="";
    }
}
export class StoreEmployeesVM{
    public ID:string;
    public UserID:string;
    public StoreID:string;
    public CreatedAt:string;
    public UAccessLevel:UserAccessLevelVM;
    constructor(){
        this.ID="";
        this.UserID="";
        this.StoreID="";
        this.CreatedAt="";
        this.UAccessLevel=new UserAccessLevelVM();
    }
    empty(){
        this.ID="";
        this.UserID="";
        this.StoreID="";
        this.CreatedAt="";
        this.UAccessLevel=new UserAccessLevelVM();
    }
    set(object){
        if(object != null){
            this.ID=object.ID;
            this.StoreID=object.StoreID;
            this.UserID=object.UserID;
            this.CreatedAt=object.CreatedAt;
        }
    }
}
