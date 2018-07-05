import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import {HttpModule} from '@angular/http'
import { IonicStorageModule } from '@ionic/storage';
import { ImagePicker } from '@ionic-native/image-picker';
import {File} from '@ionic-native/file';
import { AgmCoreModule } from '@agm/core';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {DashboardPage} from '../pages/dashboard/dashboard'
import {ViewProfilePage} from '../pages/view-profile/view-profile'
import {CreateBlogPage} from '../pages/create-blog/create-blog'
import {ReadMorePage} from '../pages/read-more/read-more'
import {SetupProfilePage} from '../pages/setup-profile/setup-profile'
import {ViewPhotosPage} from '../pages/view-photos/view-photos'
import {ProfileSettingPage} from '../pages/profile-setting/profile-setting'
import {NotificationsPage} from '../pages/notifications/notifications'
import {HelpNavigatePage} from '../pages/help-navigate/help-navigate'
//service
import {RequestService} from '../services/request.service'
import {UsersServices} from '../services/controller/userService.controller'
import {GeneralService} from '../services/general.service'
import {VlogConnectionService} from '../services/controller/vlogConnection.service';
import {FollowersService} from '../services/controller/followers.service'
import {VlogSegmentService} from '../services/controller/vlogSegment.service'
import {VlogSegmentLocationService} from '../services/controller/vlogSegmentLocation.service'
import {VlogSegmentMediaService} from '../services/controller/VlogSegmentMedia.service'
import {CountryService} from '../services/controller/country.service'
import {VlogSegmentTypeService} from '../services/controller/vlogSegmentType.service';
import {UploadService} from '../services/controller/upload.service'
import {RecommendationService} from '../services/controller/recommendation.service'
import {LocationService} from '../services/controller/location.service'
//singleton
import {GlobalDataService} from '../services/singleton/globalData.data'
//components
import {PopupMenuComponent} from '../component/popupMenu1/popMenu1.components'
//modal
import {ChooseComponentsPage} from '../pages/create-blog/choose-components/choose-components'
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DashboardPage,
    ViewProfilePage,
    CreateBlogPage,
    ChooseComponentsPage,
    ReadMorePage,
    SetupProfilePage,
    ViewPhotosPage,
    ProfileSettingPage,
    NotificationsPage,
    HelpNavigatePage,
    //component
    PopupMenuComponent
  ],
  //api key google maps
  // AIzaSyDwp5cuGRHGRklF07zlE_5Tt5jNNybEH7c
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, { scrollAssist: false, autoFocusAssist: false }),
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyDwp5cuGRHGRklF07zlE_5Tt5jNNybEH7c',
      libraries: ["places"]
    }),
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DashboardPage,
    ViewProfilePage,
    CreateBlogPage,
    ChooseComponentsPage,
    ReadMorePage,
    SetupProfilePage,
    ViewPhotosPage,
    ProfileSettingPage,
    NotificationsPage,
    HelpNavigatePage,
    //component
    PopupMenuComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Camera,
    PhotoLibrary,
    ImagePicker,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    //services
    RequestService,
    GeneralService,
    //controllers
    UsersServices,
    VlogConnectionService,
    FollowersService,
    VlogSegmentService,
    VlogSegmentLocationService,
    VlogSegmentMediaService,
    CountryService,
    VlogSegmentTypeService,
    UploadService,
    RecommendationService,
    LocationService,
    //singleton
    GlobalDataService
  ]
})
export class AppModule {}
