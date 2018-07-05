export class PositionViewModel{
    public longitude:number;
    public latitude:number;
    constructor(){
        this.longitude=0;
        this.latitude=0;
    }
    set(object){
        this.longitude=object.longitude;
        this.latitude=object.latitude;
    }
}
export class LocationStorageVM{
    public ID:string;
    public OwnerID:string;
    public Position:PositionViewModel;
    public Description:string;
    constructor(){
        this.ID="";
        this.OwnerID="";
        this.Position=new PositionViewModel();
        this.Description="";
    }
    empty(){
        this.ID="";
        this.OwnerID="";
        this.Position=new PositionViewModel();
        this.Description="";
    }
    set(object){
        if(object!=null){
            this.ID=object.ID;
            this.OwnerID=object.OwnerID;
            this.Position.longitude=object.longitude;
            this.Position.latitude=object.latitude;
            this.Description=object.Description;
        }
    }

}


