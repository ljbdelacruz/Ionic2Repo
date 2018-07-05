export class PositionViewModel{
    public Longitude:number;
    public Latitude:number;
    constructor(){
        this.Longitude=0;
        this.Latitude=0;
    }
    set(long, lat){
        this.Longitude=long;
        this.Latitude=lat;
    }
}