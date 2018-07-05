import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import {Storage} from '@ionic/storage'

@Injectable()
export class StorageFunction{
    constructor(private storage:Storage){
    }
    FetchFromLocal(id:string, success, failed){
        this.storage.get(id).then(resp=>{
            success(resp);
        }).catch(x=>{
            failed("Failed Fetching from local storage");
        })
    }
    StoreToLocal(key:string, data){
        this.storage.set(key, data);
    }
    Stack(array:any[], item:any, success){
        console.log("Stacking...");
        console.log(array.length);
        var list:any[]=[];
        list.push(item);
        console.log("Array Pass here")
        if(array.length>0){
            console.log("Length > 0");
            array.forEach(el => {
                list.push(el);
                if((array.length+1) == list.length){
                    success(list);
                }
            });
        }else{
            console.log(list);
            success(list);
        }
    }

}
