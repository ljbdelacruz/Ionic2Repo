import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Headers } from '@angular/http';
import {RequestService} from '../../../request.service';
//singleton
import {GlobalDataService} from '../../../singleton/global.data';
@Injectable()
export class SecurityCodeGeneratorService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        // this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    Insert(api:string, oid:string, success, failed){
        var body=new FormData();
        body.append("api", api);
        body.append("oid", oid);
        this.rs.SimplifyPost(this.gser.uploadURL+"SecurityCodeGenerator/Insert", this.headers, body, success.bind(this), failed.bind(this))
    }
    Remove(id:string, api:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("api", api);
        this.rs.SimplifyPost(this.gser.uploadURL+"SecurityCodeGenerator/Remove", this.headers, body, success.bind(this), failed.bind(this));
    }
    GetByOwnerID(id:string, api:string, success, failed){
        this.rs.SimplifyGet(this.gser.uploadURL+"SecurityCodeGenerator/GetByOwnerID?id="+id+"&api="+api, this.headers, success.bind(this), failed.bind(this));
    }
    GenerateCode(success, failed){
        this.rs.SimplifyGet(this.gser.uploadURL+"SecurityCodeGenerator/GenerateCode", this.headers, success.bind(this), failed.bind(this))
    }
    GenerateUID(success, failed){
        this.rs.SimplifyGet(this.gser.uploadURL+"SecurityCodeGenerator/GenerateUID", this.headers, success.bind(this), failed.bind(this))
    }
    

}
