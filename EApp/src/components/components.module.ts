import { NgModule } from '@angular/core';
import { ProgressBar1Component } from './progress-bar1/progress-bar1';
import { ImageUploadComponent } from './image-upload/image-upload';
import { UploadSingleImageComponent } from './upload-single-image/upload-single-image';
import { UploadSingleImage1Component } from './upload-single-image1/upload-single-image1';
@NgModule({
	declarations: [ProgressBar1Component,
    ImageUploadComponent,
    UploadSingleImageComponent,
    UploadSingleImage1Component,
    ],
	imports: [],
	exports: [ProgressBar1Component,
    ImageUploadComponent,
    UploadSingleImageComponent,
    UploadSingleImage1Component,
    ]
})
export class ComponentsModule {}
