export class FBUserViewModel{
    public Firstname:string;
    public Lastname:string;
    public EmailAddress:string;
    public ProfileImage:string;
    constructor(){
    }
    set(fname, lname, email, profileImage){
        this.Firstname=fname;
        this.Lastname=lname;
        this.EmailAddress=email;
        this.ProfileImage=profileImage;
    }
}