import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/catch';
import {GlobalDataService} from '../../../singleton/global.data'
import {RequestService} from '../../../request.service'
import { ImagePicker } from '@ionic-native/image-picker';
@Injectable()
export class TesterService{
    headers:any;
    constructor(private gData:GlobalDataService, private rs:RequestService, private imgPicker:ImagePicker){
        this.headers=new Headers();
        // this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    Test1(test:string, test2:string, success, failed){
        var body=new FormData();
        body.append("test", test);
        body.append("test2", test2);
        this.rs.SimplifyPost(this.gData.uploadURL+"Tester/Test1", this.headers, body, success.bind(this), failed.bind(this))
    }
    TestImage(path:string, source:string, success, failed){
        var body=new FormData();
        body.append("company", path);
        body.append("image", source);
        this.rs.SimplifyPost(this.gData.uploadURL+"Tester/TestImage", this.headers, body, success.bind(this), failed.bind(this))
    }


}
