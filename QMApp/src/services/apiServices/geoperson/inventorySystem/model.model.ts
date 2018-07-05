export class IS_ItemVM{
    public ID:string;
    public Title:string;
    public Description:string;
    public ItemCategoryID:string;
    public isCount:boolean;
    public Quantity:number;
    constructor(){
        this.ID="";
        this.Title="";
        this.Description="";
        this.ItemCategoryID="";
        this.isCount=false;
        this.Quantity=0;
    }
    set(obj){
        this.ID=obj.ID;
        this.Title=obj.Title;
        this.Description=obj.Description;
        this.ItemCategoryID=obj.ItemCategoryID;
        this.isCount=obj.isCount;
        this.Quantity=obj.Quantity;
    }
    empty(){
        this.ID="";
        this.Title="";
        this.Description="";
        this.ItemCategoryID="";
        this.isCount=false;
        this.Quantity=0;
    }
}
export class IS_ItemImagesVM{
    public ID:string;
    public Source:string;
    public ImageLinkID:string;
    constructor(){
        this.ID="";
        this.Source="";
        this.ImageLinkID="";
    }
    set(obj){
        if(obj!=null){
            this.ID=obj.ID;
            this.Source=obj.Source;
            this.ImageLinkID=obj.ImageLinkID;
        }
    }
    empty(){
        this.ID="";
        this.Source="";
    }
}
export class IS_ItemStockVM{
    public ID:string;
    public BarcodeNumber:string;
    constructor(){
        this.ID="";
        this.BarcodeNumber="";
    }
    set(object){
        this.ID=object.ID;
        this.BarcodeNumber=object.BarcodeNumber;
    }
    empty(){
        this.ID="";
        this.BarcodeNumber="";
    }
}



