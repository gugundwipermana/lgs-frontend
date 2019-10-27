import { Component, OnInit, ViewChild, Input, Output, EventEmitter }            from '@angular/core';

// crop image
import {ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';

import { AmService } from './_services/am.service';

declare var swal: any;

@Component({
        selector: 'image-crop',
        template: `

        <div>
            <img-cropper [image]="data1" [settings]="cropperSettings1" (onCrop)="cropped($event)"></img-cropper>
            <br/><br/>

            <!--
            <span class="result" *ngIf="data1.image" >
                <img [src]="data1.image"
                [width]="150"
                [height]="150"
                class="img-circle"
                >

                {{ data1.image.length }}
            </span>
            -->

            <span class="result" *ngIf="image_url" >
                <img [src]="image_url"
                [width]="150"
                [height]="150"
                class="img-circle"
                >
            </span>

        </div>

        <br/>
        <a (click)="getImage()" class="btn btn-primary">Crop</a>

        `,
        styles: [`

        `]
})

export class ImageCropComponent implements OnInit {

    @Output() imageName: EventEmitter<any> = new EventEmitter<any>();
    @Input() image_url: string;

    /**
     * ------------------------
     * CROP IMAGE
     *
     */

    name:string;
    data1:any;
    cropperSettings1:CropperSettings;
    croppedWidth:number;
    croppedHeight:number;

    @ViewChild('cropper', undefined) cropper:ImageCropperComponent;

        constructor(
                public amService: AmService
        ) {

            /**
             * ------------------------
             * CROP IMAGE
             *
             */
            this.name = 'Angular2'
            this.cropperSettings1 = new CropperSettings();

            this.cropperSettings1.croppedWidth = 200;
            this.cropperSettings1.croppedHeight = 200;

            this.cropperSettings1.canvasWidth = 300;
            this.cropperSettings1.canvasHeight = 200;

            this.cropperSettings1.minWidth = 100;
            this.cropperSettings1.minHeight = 100;

            this.cropperSettings1.rounded = false;
            this.cropperSettings1.keepAspect = false;

            this.cropperSettings1.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
            this.cropperSettings1.cropperDrawSettings.strokeWidth = 2;

            this.data1 = {};

        }

        ngOnInit() {
                // this.data1.image = this.image_url;

                // console.log("DATA AVATAR: "+this.image_url);
        }

        /**
         * ------------------------
         * CROP IMAGE
         *
         */
        cropped(bounds:Bounds) {
                this.croppedHeight =bounds.bottom-bounds.top;
                this.croppedWidth = bounds.right-bounds.left;
        }

        fileChangeListener($event) {
            var image:any = new Image();
            var file:File = $event.target.files[0];
            var myReader:FileReader = new FileReader();
            var that = this;

            myReader.onloadend = function (loadEvent:any) {
                image.src = loadEvent.target.result;
                that.cropper.setImage(image);

            };

            myReader.readAsDataURL(file);
        }


        getImage() {

            let formData = new FormData();

            formData.append("image_file", this.data1.image);

            this.amService.upload(formData)
                .subscribe(result=> {
                    this.imageName.emit(result.name);
                    this.image_url = result.url;
                });

        }
}