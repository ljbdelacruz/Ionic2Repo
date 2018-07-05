import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {HttpModule} from '@angular/http'
import { Geolocation } from '@ionic-native/geolocation';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { IonicStorageModule } from '@ionic/storage';
import { SMS } from '@ionic-native/sms';
import {Facebook} from '@ionic-native/facebook'
import { BackgroundMode } from '@ionic-native/background-mode';
import { PhonegapLocalNotification } from '@ionic-native/phonegap-local-notification';
import { ImagePicker } from '@ionic-native/image-picker';

import { MyApp } from './app.component';
import {MarketPage} from '../pages/market/market'
import {LoginPage} from '../pages/login/login'
import {DashboardPage} from '../pages/dashboard/dashboard'
import {AddProductPage} from '../pages/add-product/add-product'
import {SelectCategoryPage} from '../pages/select-category/select-category'
import {ViewUserAdPage} from '../pages/view-user-ad/view-user-ad'
import {ViewAdDetailsPage} from '../pages/view-ad-details/view-ad-details'
import {ChatSessionPage} from '../pages/chat-session/chat-session'
//superadmin sub pages
import {SuperAdminPage} from '../pages/super-admin/super-admin';
import {ManageCategoriesPage} from '../pages/super-admin/sub/manage-categories/manage-categories'
//inbox
import {InboxPage} from '../pages/inbox/inbox'
import {SendMessagePage} from '../pages/send-message/send-message'
import {ViewChatSessionInformationPage} from '../pages/view-chat-session-information/view-chat-session-information'
//userinformation
import {ViewUserInformationPage} from '../pages/view-user-information/view-user-information'
import {ViewUserReivewContentPage} from '../pages/view-user-reivew-content/view-user-reivew-content'
import {ModifyReviewPage} from '../pages/modify-review/modify-review'
import {UpdateUserInfoPage} from '../pages/update-user-info/update-user-info'
import {FilterPage} from '../pages/filter/filter'
import {WishlistPage} from '../pages/wishlist/wishlist'
import {ViewNotificationPage} from '../pages/view-notification/view-notification'
import {SignUpPage} from '../pages/sign-up/sign-up'
import {ReportPage} from '../pages/report/report'


//components
import {PopupMenuComponent} from '../components/popupMenu1/popMenu1.components'
import {ProgressBar1Component} from '../components/progress-bar1/progress-bar1'
//services
import {UsersServices} from '../services/controller/user.services'
//81
import {ItemService} from '../services/controller/81/item.service'
import {RequestService} from '../services/controller/request.service'
import {GlobalDataService} from '../services/singleton/global.data'
import {GeneralService} from '../services/general.service'
import {UploadService} from '../services/controller/82/upload.service'
import {ItemImageService} from '../services/controller/81/itemImage.service'
import {ItemCategoryService} from '../services/controller/81/itemCategory.service'
import {ItemSubCategoryService} from '../services/controller/81/itemSubCategory.service'
import {ItemAssignCategoryService} from '../services/controller/81/itemAssignCategory.service'
import {UserSettingsService} from '../services/controller/81/userSettings.service'
import {UserReviewService} from '../services/controller/81/userReview.service'
//chronoid base
//reporting system
import {ReportClaimsService} from '../services/apiServices/chronoidBase/ReportSystem/reportClaims.service'
//signalR
import {SignalRCpnnectionService} from '../services/apiServices/chronoidBase/signalR/signalRConnection.service'
//cloud messages
//messaging app
import {MessagingRoomParticipantService} from '../services/apiServices/messagingApp/messagingRoomParticipants.service'
import {MessagingConversationService} from '../services/apiServices/messagingApp/messagingConversation.service'
import {MessagingRoomService} from '../services/apiServices/messagingApp/messagingRoom.service'
//cloud notification
import {CloudNotificationService} from '../services/apiServices/cloudNotificationService/cloudNotification.service'
//function
import {ItemCategoryFunction} from '../services/function/itemCategory.function'
import {ItemFunction} from '../services/function/item.function'
import {UserFunction} from '../services/function/user.function'
import {ItemAssignCategoryFunction} from '../services/function/itemAssignCategory.function'
import {UserSettingsFunction} from '../services/function/userSettings.function'
import {UserReviewFunction} from '../services/function/userReview.function'
//facebook services
import {MyFacebookService} from '../services/apiServices/facebookServices/facebook.service'
//upload services
import {UploadersFunction} from '../services/apiServices/Uploaders/uploaders.function'
import {UploadersService} from '../services/apiServices/Uploaders/uploaders.service'
//storage function
import {StorageFunction} from '../services/function/storage.function'
//location storage service
import {LocationStorageService} from '../services/apiServices/locationTracking/locationStorage.service'

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    MarketPage,
    DashboardPage,
    AddProductPage,
    SelectCategoryPage,
    ViewUserAdPage,
    ViewAdDetailsPage,
    InboxPage,
    SendMessagePage,
    ViewChatSessionInformationPage,
    ChatSessionPage,
    SuperAdminPage,
    ManageCategoriesPage,
    ViewUserInformationPage,
    ViewUserReivewContentPage,
    ModifyReviewPage,
    UpdateUserInfoPage,
    FilterPage,
    WishlistPage,
    ViewNotificationPage,
    SignUpPage,
    ReportPage,
    //components
    PopupMenuComponent,
    ProgressBar1Component
  ],
  imports: [
    BrowserModule,
    // IonicModule.forRoot(MyApp, { scrollAssist: false, autoFocusAssist: false }),
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicImageViewerModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    MarketPage,
    DashboardPage,
    AddProductPage,
    SelectCategoryPage,
    ViewUserAdPage,
    ViewAdDetailsPage,
    InboxPage,
    SendMessagePage,
    ViewChatSessionInformationPage,
    ChatSessionPage,
    SuperAdminPage,
    ManageCategoriesPage,
    ViewUserInformationPage,
    ViewUserReivewContentPage,
    ModifyReviewPage,
    UpdateUserInfoPage,
    FilterPage,
    WishlistPage,
    ViewNotificationPage,
    SignUpPage,
    ReportPage,
    //components
    PopupMenuComponent,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpModule,
    Geolocation,
    SMS,
    Facebook,
    BackgroundMode,
    PhonegapLocalNotification,
    ImagePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    //services
    UsersServices,
    RequestService,
    GeneralService,
    //82
    UploadService,
    //81
    ItemService,
    ItemImageService,
    ItemCategoryService,
    ItemSubCategoryService,
    ItemAssignCategoryService,
    UserSettingsService,
    UserReviewService,
    //singleton
    GlobalDataService,
    //function
    ItemCategoryFunction,
    ItemFunction,
    UserFunction,
    ItemAssignCategoryFunction,
    UserSettingsFunction,
    UserReviewFunction,
    //chronoid base service
    //report system
    ReportClaimsService,
    //signalR
    SignalRCpnnectionService,
    //facebook services
    MyFacebookService,
    //uploaders services
    UploadersFunction,
    UploadersService,
    //storage function
    StorageFunction,
    //messagingApp
    MessagingConversationService,
    MessagingRoomParticipantService,
    MessagingRoomService,
    //cloudNotificatio
    CloudNotificationService,
    //location storage servie
    LocationStorageService
  ]
})
export class AppModule {}
