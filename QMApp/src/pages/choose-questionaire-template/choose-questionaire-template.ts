import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GeneralService} from '../../services/general.service'
import {GlobalDataService} from '../../services/singleton/global.data'
import {CreateQuizPage} from '../Questionaires/create-quiz/create-quiz'
@IonicPage()
@Component({
  selector: 'page-choose-questionaire-template',
  templateUrl: 'choose-questionaire-template.html',
})
export class ChooseQuestionaireTemplatePage {
  event:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private gData:GlobalDataService, private gSer:GeneralService) {
    var param=this.navParams.get("param");
    this.event=param.event!=undefined?param.event:null;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChooseQuestionaireTemplatePage');
  }
  Close(){
    this.navCtrl.pop();
  }
  CreateQuestions(){
    this.navCtrl.push(CreateQuizPage, {"param":{uid:this.gData.userInfo.ID, mode:0, event:this.SuccessEvent.bind(this), quizInfoType:"419d67aa-4436-4811-a570-a716e7da490f"}});
  }
  CreateSurvey(){
    this.navCtrl.push(CreateQuizPage, {"param":{uid:this.gData.userInfo.ID, mode:0, event:this.SuccessEvent.bind(this), quizInfoType:"a69d7206-4bd6-4b79-9460-e38ed713efe0"}});
  }
  SuccessEvent(){
    this.Close();
    if(this.event!=null){
      this.event();
    }
  }

}
