import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { SecurityContext } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.less'],
})
export class ImageModalComponent {
  imageUrl!: string;
  aspectRatio = 1;
  previewWidth = 200;
  resizeSettings = { width: this.previewWidth };
  imageChangedEvent: any = '';
  croppedImage: any = '';
  showCropper = true; // Added this line
  @Input() image!: string; // Change the name of the input property to match
  @Input() caption: string = '';

  constructor(
    private modalRef: NzModalRef,
    private sanitizer: DomSanitizer,
    private message: NzMessageService
  ) {
    const modalComponentParams = modalRef.getConfig().nzComponentParams;
    this.image = modalComponentParams?.['image'];
    this.caption = modalComponentParams?.['caption']; // Ensure the caption is retrieved
  }

  submitForm(): void {
    this.modalRef.close({
      croppedImage: this.croppedImage,
      caption: this.caption,
    });
  }
  checkImageType(blob: Blob): boolean {
    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg']; // You can add or remove types as needed
    if (!validImageTypes.includes(blob.type)) {
      this.message.create(
        'error',
        `Incorrect image type. Supported types are: ${validImageTypes.join(
          ', '
        )}`
      );
      return false; // Invalid image type
    }
    return true; // Valid image type
  }

  fileChangeEvent(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const isValidImageType = this.checkImageType(file);
      if (!isValidImageType) {
        return; // Return early if the image type is not valid
      }
      this.imageChangedEvent = event; // Proceed with setting imageChangedEvent if the image type is valid
    }
  }

  imageCropped(event: ImageCroppedEvent) {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.croppedImage = this.sanitizer.bypassSecurityTrustResourceUrl(
        fileReader.result as string
      );
    };
    if (event.blob) {
      this.checkImageType(event.blob);

      fileReader.readAsDataURL(event.blob);
    }
  }

  ngOnInit() {
    const sanitizedSrc = this.image;
    const actualSrc =
      this.sanitizer.sanitize(SecurityContext.URL, sanitizedSrc) || '';
    const blob = this.dataURItoBlob(actualSrc);
    const blobUrl = URL.createObjectURL(blob);

    const img = new Image();
    img.onload = () => {
      this.previewWidth = img.width;

      this.resizeSettings = { width: this.previewWidth };

      this.forceCropperRerender();
    };
    img.src = blobUrl;

    this.imageChangedEvent = {
      target: {
        files: [new File([blob], 'filename', { type: 'image/png' })],
      },
    };
  }

  dataURItoBlob(dataURI: any) {
    // Unwrap the safe value
    const actualDataURI =
      this.sanitizer.sanitize(SecurityContext.URL, dataURI) || '';

    console.log('actualDataURI before split:', actualDataURI); // Log the unwrapped dataURI

    const parts = actualDataURI.split(',');
    if (parts.length !== 2) {
      throw new Error('Invalid data URI');
    }
    console.log('Base64 part:', parts[1]);

    const byteString = atob(parts[1]);
    const mimeString = parts[0].split(':')[1].split(';')[0];

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  updateCropper(width: number) {
    this.previewWidth = width;
    this.resizeSettings = { width: this.previewWidth };
    this.forceCropperRerender();
  }
  updateCropperOnMouseUp(event: any): void {
    const width = event.target.valueAsNumber;
    this.updateCropper(width);
  }

  forceCropperRerender() {
    this.showCropper = false;
    setTimeout(() => (this.showCropper = true), 0);
  }
}
