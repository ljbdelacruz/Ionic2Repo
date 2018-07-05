import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
//3rd party plugins
import {HttpModule} from '@angular/http'
import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundMode } from '@ionic-native/background-mode';
import { PhonegapLocalNotification } from '@ionic-native/phonegap-local-notification';
import { IonicStorageModule } from '@ionic/storage';
import { ImagePicker } from '@ionic-native/image-picker';
import { IonicImageViewerModule } from 'ionic-img-viewer';

import { MyApp } from './app.component';
import {LoginPage} from '../pages/login/login'
import {DashboardPage} from '../pages/dashboard/dashboard'
import {ChooseQuestionaireTemplatePage} from '../pages/choose-questionaire-template/choose-questionaire-template'
import {SignUpPage} from '../pages/sign-up/sign-up'
//questionaires
import {CreateQuestionsPage} from '../pages/Questionaires/create-questions/create-questions'
import {CreateQuizPage} from '../pages/Questionaires/create-quiz/create-quiz'
import {ViewQuizListPage} from '../pages/Questionaires/view-quiz-list/view-quiz-list'
import {ViewQuestionListPage} from '../pages/Questionaires/view-question-list/view-question-list'
import {AnswerQuizPage} from '../pages/Questionaires/answer-quiz/answer-quiz'
import {QuizTakersListPage} from '../pages/Questionaires/quiz-takers-list/quiz-takers-list'
import {ViewQuizInfoPage} from '../pages/Questionaires/view-quiz-info/view-quiz-info'
//survey
import {SurveyInfoOverviewPage} from '../pages/Surveys/survey-info-overview/survey-info-overview'

//components
import {PopupMenuComponent} from '../components/popupMenu1/popMenu1.components'
import {ProgressBar1Component} from '../components/progress-bar1/progress-bar1'
import {UploadSingleImageComponent} from '../components/upload-single-image/upload-single-image'
import {UploadSingleImage1Component} from '../components/upload-single-image1/upload-single-image1'
import {PopupImageDisplayComponent} from '../components/popupImageDisplay/popImageDisplay.components'
//services
//chronoid
import {UsersServices} from '../services/apiServices/chronoidBaseApp/userManagement/user.service'
import {UserAccessLevelService} from '../services/apiServices/chronoidBaseApp/userManagement/userAccessLevel.service'
import {GroupingsDataService} from '../services/apiServices/chronoidBaseApp/groupings/groupings.service'
//geoperson
import {LocationStorageService} from '../services/apiServices/geoperson/locationTracking/locationTracking.service'
import {QuizInfoService} from '../services/apiServices/geoperson/QuizMaker/quizInfo.service'
import {QuizQuestionService} from '../services/apiServices/geoperson/QuizMaker/quizQuestion.service'
import {QuizQuestionAnswerService} from '../services/apiServices/geoperson/QuizMaker/quizQuestionAnswer.service'
import {QuizTakersService} from '../services/apiServices/geoperson/QuizMaker/quizTakers.service'
import {QuizUserAnswerService} from '../services/apiServices/geoperson/QuizMaker/quizUserAnswer.service'
//uploaders
import {SecurityCodeGeneratorService} from '../services/apiServices/uploaderService/securityCodeGenerator/securityCodeGenerator.service'
import {ImageLinkStorageService} from '../services/apiServices/uploaderService/imageLinkStorage/imageLinkStorage.service'
import {UploadService} from '../services/apiServices/uploaderService/upload.service'
//services
import {RequestService} from '../services/request.service'
import {GeneralService} from '../services/general.service'
//singleton
import {GlobalDataService} from '../services/singleton/global.data'
@NgModule({
  declarations:[
    MyApp,
    LoginPage,
    DashboardPage,
    ChooseQuestionaireTemplatePage,
    SignUpPage,
    //questionaires
    CreateQuestionsPage,
    CreateQuizPage,
    ViewQuizListPage,
    ViewQuestionListPage,
    AnswerQuizPage,
    QuizTakersListPage,
    ViewQuizInfoPage,
    //survey
    SurveyInfoOverviewPage,
    //components
    PopupMenuComponent,
    PopupImageDisplayComponent,
    ProgressBar1Component,
    UploadSingleImageComponent,
    UploadSingleImage1Component
    
  ],
  imports: [
    BrowserModule,
    IonicImageViewerModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    DashboardPage,
    ChooseQuestionaireTemplatePage,
    SignUpPage,
    //questionaires
    CreateQuestionsPage,
    CreateQuizPage,
    ViewQuizListPage,
    ViewQuestionListPage,
    AnswerQuizPage,
    QuizTakersListPage,
    ViewQuizInfoPage,
    //survey
    SurveyInfoOverviewPage,
    //components
    PopupMenuComponent,
    PopupImageDisplayComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpModule,
    Geolocation,
    BackgroundMode,
    PhonegapLocalNotification,
    ImagePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    //chronoid base services
    UsersServices,
    UserAccessLevelService,
    GroupingsDataService,
    //geoperson
    LocationStorageService,
    QuizInfoService,
    QuizQuestionService,
    QuizQuestionAnswerService,
    QuizTakersService,
    QuizUserAnswerService,
    //uploaders
    SecurityCodeGeneratorService,
    ImageLinkStorageService,
    UploadService,
    //services
    RequestService,
    GeneralService,
    //singleton
    GlobalDataService
  ]
})
export class AppModule {}
