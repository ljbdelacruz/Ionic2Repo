import { ItemsImagesVM } from "../buyandsell/model.model";
import { ImageLinkStorageVM } from "../../uploaderService/imageLinkStorage/model.model";

///specifically used in buy and sell items
export class ItemsVM{
    public ID:string;
    public Title:string;
    public Description:string;
    public Price:number;
    public OwnerID:string;
    public PostType:string;
    public UpdatedAt:string;
    public TimesViewed:number;
    public isArchived:boolean;
    public ItemImages:ItemsImagesVM[];
    public ImageLinks:ImageLinkStorageVM[];

    constructor(){
        this.ID="";
        this.Title="";
        this.Description="";
        this.Price=0;
        this.OwnerID="";
        this.PostType="";
        this.UpdatedAt="";
        this.TimesViewed=0;
        this.isArchived=false;
        this.ItemImages=[];
        this.ImageLinks=[];
    }
    empty(){
        this.ID="";
        this.Title="";
        this.Description="";
        this.Price=0;
        this.OwnerID="";
        this.PostType="";
        this.UpdatedAt="";
        this.TimesViewed=0;
        this.isArchived=false;
        this.ItemImages=[];
    }
    set(object){
        if(object != null){
            this.ID=object.ID;
            this.Title=object.Title;
            this.Description=object.Description;
            this.Price=object.Price;
            this.OwnerID=object.OwnerID;
            this.PostType=object.PostType;
            this.UpdatedAt=object.UpdatedAt;
            this.TimesViewed=object.TimesViewed;
            this.isArchived=object.isArchived;
        }
    }
}
export class ItemImageVM{
    public ID:string;
    public Source:string;
    constructor(){
        this.ID="";
        this.Source="";
    }
    empty(){
        this.ID="";
        this.Source="";
    }
    set(object){
        if(object != null){
            this.ID=object.ID;
            this.Source=object.Source;
        }
    }
}
export class ItemCategoryVM{
    public ID:string;
    public Name:string;
    public ItemSub:ItemSubCategoryVM[]=[];
    constructor(){
        this.ID="";
        this.Name="";
        this.ItemSub=[];
    }
    empty(){
        this.ID="";
        this.Name="";
        this.ItemSub=[];
    }
    set(object){
        if(object != null){
            this.ID=object.ID;
            this.Name=object.Name;
        }
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
    empty(){
        this.ID="";
        this.Name="";
        this.Category="";
    }
    set(object){
        if(object != null){
            this.ID=object.ID;
            this.Name=object.Name;
            this.Category=object.Category;
        }
    }
}
export class ItemAssignCategoryVM{
    public ID:string;
    public ItemID:string;
    public CategoryID:string;
    constructor(){
        this.ID="";
        this.ItemID="";
        this.CategoryID="";
    }
    empty(){
        this.ID="";
        this.ItemID="";
        this.CategoryID="";
    }
    set(object){
        if(object != null){
            this.ID=object.ID;
            this.ItemID=object.ItemID;
            this.CategoryID=object.CategoryID;
        }
    }

}