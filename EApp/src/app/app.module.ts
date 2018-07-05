import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {HttpModule} from '@angular/http'
import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundMode } from '@ionic-native/background-mode';
import { PhonegapLocalNotification } from '@ionic-native/phonegap-local-notification';
import { ImagePicker } from '@ionic-native/image-picker';
import { IonicStorageModule } from '@ionic/storage';


import { MyApp } from './app.component';
import {LoginPage} from '../pages/login/login'
import {SignUpPage} from '../pages/sign-up/sign-up'
import {DashboardPage} from '../pages/dashboard/dashboard'
//user pages
import {SearchStorePage} from '../pages/UserPages/search-store/search-store'
import {ViewProfilePage} from '../pages/UserPages/view-profile/view-profile'
import {UserReviewPage} from '../pages/UserPages/user-review/user-review'
//admin pages
import {CreateStorePage} from '../pages/AdminPages/create-store/create-store'
import {StoreListPage} from '../pages/AdminPages/store-list/store-list'
//components
import {PopupMenuComponent} from '../components/popupMenu1/popMenu1.components'
import {ImageUploadComponent} from '../components/image-upload/image-upload'
import {ProgressBar1Component} from '../components/progress-bar1/progress-bar1'
import {UploadSingleImageComponent} from '../components/upload-single-image/upload-single-image'
import {UploadSingleImage1Component} from '../components/upload-single-image1/upload-single-image1'
//services
//chronoidBase
import {UsersServices}from '../services/apiServices/chronoidBaseApp/userManagement/user.service'
import {UserAccessLevelService} from '../services/apiServices/chronoidBaseApp/userManagement/userAccessLevel.service'
import {MyStoreService} from '../services/apiServices/chronoidBaseApp/storeManagement/mystore.service'
import {StoreBranchService} from '../services/apiServices/chronoidBaseApp/storeManagement/storeBranch.service'
import {StoreEmployeesService} from '../services/apiServices/chronoidBaseApp/storeManagement/storeEmployee.service'
//geoperson
import {LocationStorageService} from '../services/apiServices/geoperson/locationTracking/locationTracking.service'
import {UserReviewService} from '../services/apiServices/geoperson/userReview/userReview.service'
//uploaders
import {SecurityCodeGeneratorService} from '../services/apiServices/uploaderService/securityCodeGenerator/securityCodeGenerator.service'
import {ImageLinkStorageService} from '../services/apiServices/uploaderService/imageLinkStorage/imageLinkStorage.service'
import {UploadService} from '../services/apiServices/uploaderService/upload.service'
import {TesterService} from '../services/apiServices/uploaderService/testerController/tester.service'
//general services
import {RequestService} from '../services/request.service'
import {GeneralService} from '../services/general.service'
//singleton
import {GlobalDataService} from '../services/singleton/global.data'
@NgModule({
  declarations:[
    MyApp,
    LoginPage,
    SignUpPage,
    DashboardPage,
    //AdminPages
    CreateStorePage,
    StoreListPage,
    //userspage
    SearchStorePage,
    ViewProfilePage,
    UserReviewPage,
    //components
    PopupMenuComponent,
    ImageUploadComponent,
    ProgressBar1Component,
    UploadSingleImageComponent,
    UploadSingleImage1Component,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignUpPage,
    DashboardPage,
    //Admin Pages
    CreateStorePage,
    StoreListPage,
    //users page
    SearchStorePage,
    ViewProfilePage,
    UserReviewPage,
    //components
    PopupMenuComponent
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
    //base
    UsersServices,
    UserAccessLevelService,
    MyStoreService,
    StoreBranchService,
    StoreEmployeesService,
    //geoperson
    LocationStorageService,
    UserReviewService,
    //uploaders
    SecurityCodeGeneratorService,
    ImageLinkStorageService,
    UploadService,
    TesterService,
    //general services
    RequestService,
    GeneralService,
    //singleton
    GlobalDataService
  ]
})
export class AppModule {}
