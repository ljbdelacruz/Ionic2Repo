import { UsersViewModel } from "../../chronoidBaseApp/userManagement/model.model";
import { ImageLinkStorageVM } from "../../uploaderService/imageLinkStorage/model.model";
import { GroupingsDataVM } from "../../chronoidBaseApp/groupings/model.model";

export class QuizInfoVM{
    public ID:string;
    public Name:string;
    public QuizCode:string;
    public QuizTaker:QuizTakersVM;
    public Status:string;
    public QuizStatus:string;
    //this contains the 100% score of this test
    public TotalPoints:number;
    constructor(){
        this.ID="";
        this.Name="";
        this.QuizCode="";
        this.QuizTaker=new QuizTakersVM();
        this.Status="";
        this.QuizStatus="";
    }
    set(object){
        if(object !=null){
            this.ID=object.ID;
            this.Name=object.Name;
            this.QuizCode=object.QuizCode;
            this.TotalPoints=object.TotalPoints!=undefined?object.TotalPoints:0;
            this.Status=object.Status;
            this.QuizStatus=object.QuizStatus;
        }
    }
    empty(){
        this.ID="";
        this.Name="";
        this.QuizCode="";
        this.QuizTaker=new QuizTakersVM();
        this.Status="";
        this.QuizStatus="";
    }
}
export class QuizQuestionsVM{
    public ID:string;
    public Questions:string;
    public Points:number;
    public Order:number;
    public Status:string;
    public Choices:QuizQuestionAnswerVM[];
    public UserAnswer:QuizUserAnswerVM;
    public QuizImages:GroupingsDataVM[];
    constructor(){
        this.ID="";
        this.Questions="";
        this.Points=0;
        this.Order=0;
        this.Status="";
        this.Choices=[];
        this.UserAnswer=new QuizUserAnswerVM();
        this.QuizImages=[];
    }
    set(object){
        if(object !=null){
            this.ID=object.ID;
            this.Questions=object.Questions;
            this.Points=object.Points;
            this.Order=object.Order;
            this.Status=object.Status;
        }else{
            this.empty();
        }
    }
    empty(){
        this.ID="";
        this.Questions="";
        this.Points=0;
        this.Order=0;
        this.Status="";
        this.Choices=[];
        this.UserAnswer=new QuizUserAnswerVM();
        this.QuizImages=[];
    }
}
export class QuizQuestionAnswerVM{
    public ID:string;
    public Description:string;
    public isCorrect:boolean;
    public Percentage:number;
    public Images:GroupingsDataVM[];
    public isNew:boolean;
    constructor(){
        this.ID="";
        this.Description="";
        this.isCorrect=false;
        this.Percentage=0;
        this.Images=[];
        this.isNew=false;
    }
    set(object){
        if(object != null){
            this.ID=object.ID;
            this.Description=object.Description;
            this.isCorrect=object.isCorrect;
            this.Percentage=object.Percentage!=undefined?object.Percentage:0;
            this.isNew=object.isNew!=undefined?object.isNew:false;
            this.Images=object.Images!=undefined?object.Images:[];
        }
    }
    empty(){
        this.ID="";
        this.Description="";
        this.isCorrect=false;
        this.Percentage=0;
        this.Images=[];
        this.isNew=false;
    }
}
export class QuizTakersVM{
    public ID:string;
    public UserID:string;
    public CreatedAt:string;
    public UserInfo:UsersViewModel;
    public TotalPoints:number;
    public QuizInfoID:string;
    constructor(){
        this.ID="";
        this.UserID="";
        this.CreatedAt="";
        this.UserInfo=new UsersViewModel();
        this.QuizInfoID="";
    }
    set(object){
        if(object!=null){
            this.ID=object.ID;
            this.UserID=object.UserID;
            this.CreatedAt=object.CreatedAt;
            this.TotalPoints=object.TotalPoints;
            this.QuizInfoID=object.QuizInfoID;
        }
    }
    empty(){
        this.ID="";
        this.UserID="";
        this.CreatedAt="";
        this.UserInfo.empty();
        this.QuizInfoID="";
        
    }
}
export class QuizUserAnswerVM{
    public ID:string;
    public QuizQuestionID:string;
    public QuizAnswerID:string;
    public OtherAnswer:string;
    public Points:number;
    constructor(){
        this.ID="";
        this.QuizQuestionID="";
        this.QuizAnswerID="";
        this.OtherAnswer="";
        this.Points=0;
    }
    set(object){
        if(object !=null){
            this.ID=object.ID;
            this.QuizQuestionID=object.QuizQuestionID;
            this.QuizAnswerID=object.QuizAnswerID;
            this.OtherAnswer=object.OtherAnswer;
            this.Points=object.Points;
        }else{
            this.empty();
        }
    }
    empty(){
        this.ID="";
        this.QuizQuestionID="";
        this.QuizAnswerID="";
        this.OtherAnswer="";
        this.Points=0;
    }
}
