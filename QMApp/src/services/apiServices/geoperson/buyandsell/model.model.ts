import { ImageLinkStorageVM } from "../../uploaderService/imageLinkStorage/model.model";

export class ItemsImagesVM{
    public ID:string;
    public ItemID:string;
    public ImageLinkStorageID:string;
    public ImageLinkStorage:ImageLinkStorageVM;
    constructor(){
        this.ID="";
        this.ItemID="";
        this.ImageLinkStorageID="";
        this.ImageLinkStorage=new ImageLinkStorageVM();
    }
    empty(){
        this.ID="";
        this.ItemID="";
        this.ImageLinkStorageID="";
        this.ImageLinkStorage=new ImageLinkStorageVM();
    }
    set(object){
        if(object != null){
            this.ID=object.ID;
            this.ItemID=object.ItemID;
            this.ImageLinkStorageID=object.ImageLinkStorageID;
        }
    }

}