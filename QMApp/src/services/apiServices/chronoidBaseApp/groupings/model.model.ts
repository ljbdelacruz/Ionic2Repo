import { ImageLinkStorageVM } from "../../uploaderService/imageLinkStorage/model.model";

export class GroupingsDataVM{
    public ID:string;
    public SourceID:string;
    public OwnerID:string;
    public Image:ImageLinkStorageVM;
    constructor(){
        this.ID="";
        this.SourceID="";
        this.OwnerID="";
        this.Image=new ImageLinkStorageVM();
    }
    empty(){
        this.ID="";
        this.SourceID="";
        this.OwnerID="";
        this.Image=new ImageLinkStorageVM();
    }
    set(object){
        if(object!=null){
            this.ID=object.ID;
            this.SourceID=object.SourceID;
            this.OwnerID=object.OwnerID;
        }
    }
}