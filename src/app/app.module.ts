import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxTiptapModule } from 'ngx-tiptap';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { CustomStylesDirective } from './custom-styles.directive';
import { ColorPickerModule } from 'ngx-color-picker';

import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { LinkmodalComponent } from './linkmodal/linkmodal.component';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { TableModalComponent } from './table-modal/table-modal.component';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { VideoModalComponent } from './video-modal/video-modal.component';
import { ImageModalComponent } from './image-modal/image-modal.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImageComponent } from './image/image.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { EditorButtonComponent } from './editor-button/editor-button.component';
import { OverlayButtonComponent } from './overlay-button/overlay-button.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    CustomStylesDirective,
    LinkmodalComponent,
    TableModalComponent,
    VideoModalComponent,
    ImageModalComponent,
    ImageComponent,
    EditorButtonComponent,
    OverlayButtonComponent,
    ToolbarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxTiptapModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzPageHeaderModule,
    NzCardModule,
    NzSpaceModule,
    NzGridModule,
    NzButtonModule,
    NzTypographyModule,
    ColorPickerModule,
    NzCollapseModule,
    NzModalModule,
    NzSelectModule,
    NzDropDownModule,
    ReactiveFormsModule,
    NzMessageModule,
    NzGridModule,
    NzSwitchModule,
    NzIconModule,
    ImageCropperModule,
    NzDividerModule,
    NzToolTipModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
