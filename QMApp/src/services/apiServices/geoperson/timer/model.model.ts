export class TimerAppVM{
    public ID:string;
    public OwnerID:string;
    public CreatedAt:any;
    constructor(){
        this.ID="";
        this.OwnerID="";
    }
    empty(){
        this.ID="";
        this.OwnerID="";
    }
    set(object){
        if(object != null){
            this.ID=object.ID;
            this.OwnerID=object.OwnerID;
            this.CreatedAt=object.CreatedAt;
        }
    }
}
export class TimerAppLimitersVM{
    public ID:string;
    public StatusReferenceID:string;
    public Seconds:number;
    constructor(){
        this.ID="";
        this.StatusReferenceID="";
        this.Seconds=0;
    }
    empty(){
        this.ID="";
        this.StatusReferenceID="";
        this.Seconds=0;
    }
    set(object){
        if(object!=null){
            this.ID=object.ID;
            this.StatusReferenceID=object.StatusReferenceID;
            this.Seconds=object.Seconds;
        }
    }
}
export class TimerLeftVM{
    public ID:string;
    public TimerAppID:string;
    public CreatedAt:any;
    constructor(){
        this.ID="";
        this.TimerAppID="";
    }
    empty(){
        this.ID="";
        this.TimerAppID="";
    }
    set(object){
        if(object!=null){
            this.ID=object.ID;
            this.TimerAppID=object.TimerAppID;
            this.CreatedAt=object.CreatedAt;
        }
    }
}
