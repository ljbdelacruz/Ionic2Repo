export class DoorbellAppVM{
    public ID:string;
    public Name:string;
    public GeolocationID:string;
    public MyConnectionID:string;
    constructor(){
        this.ID="";
        this.Name="";
        this.GeolocationID="";
        this.MyConnectionID="";
    }
    set(object){
        this.ID=object.ID;
        this.Name=object.Name;
        this.GeolocationID=object.GeolocationID;
        this.MyConnectionID=object.MyConnectionID;
    }
    empty(){
        this.ID="";
        this.Name="";
        this.GeolocationID="";
        this.MyConnectionID="";
    }

}