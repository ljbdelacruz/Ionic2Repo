import {Component, EventEmitter, Input, Output, OnDestroy} from '@angular/core';
import {NavParams} from 'ionic-angular'
import { GroupingsDataVM } from '../../services/apiServices/chronoidBaseApp/groupings/model.model';
import {GlobalDataService} from '../../services/singleton/global.data'
@Component({
    selector:'app-pop-menu1',
    templateUrl:'./popImageDisplay.components.html'
})
export class PopupImageDisplayComponent implements OnDestroy{

    imgURL:string;
    groupData:GroupingsDataVM[];
    /*number of seconds ionInput event will execute*/
    constructor(navParam:NavParams, private gData:GlobalDataService){
        var param=navParam.get("param");
        this.groupData=param.data;
        this.imgURL=this.gData.uploadURL;
    }
    ngOnDestroy() {
    }
}

