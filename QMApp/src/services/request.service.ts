import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
@Injectable()
export class RequestService{
    constructor(private http:Http){}
    Get(route:string, headers:any ){
        return this.http.get(route, {headers:headers}).map((response)=>{
            return response;
        }, err => console.log(err));
    }
    Post(route:string, headers:any){
        let options = new RequestOptions({ headers: headers });
        return this.http.post(route, options).map((response)=>{
            return response;
        }, err => console.log(err));
    }
    PostParam(route:string, headers:any, param:any){
        let options = new RequestOptions({ headers: headers });
        return this.http.post(route, param, options).map((response)=>{
            return response;
        }, err=>console.log("Error"));
    }
    PostParam2(route:string, headers:any, param:FormData){
        let options = new RequestOptions({ headers: headers });
        return this.http.post(route, param, options).map((response)=>{
            return response;
        }, err=>console.log("Error"));
    }
    GetParam(route:string, headers:any, param:any){
        let options = new RequestOptions({ headers: headers });
        return this.http.get(route, options).map((response)=>{
            return response;
        }, err => console.log(err));
    }    
    SimplifyPost(url:string, headers:any, body, success, failed){
        this.PostParam(url, headers, body).subscribe(resp=>{
            this.ReturnUpdate(resp, success.bind(this), failed.bind(this));
        }, err=>{
            failed("");
        })
    }
    SimplifyGet(url:string, headers:any, success, failed){
        this.Get(url, headers).subscribe(resp=>{
            this.ReturnUpdate(resp, success.bind(this), failed.bind(this));
        }, err=>{
            failed("");
        })
    }
    ReturnUpdate(resp, success, failed){
        if(resp.json().success){
            success(resp.json().data);
        }else{
            failed(resp.json().message)
        }
    }



}



