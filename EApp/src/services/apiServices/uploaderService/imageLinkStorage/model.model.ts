export class ImageLinkStorageVM{
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
    empty(){
        this.ID="";
        this.Source="";
    }
}