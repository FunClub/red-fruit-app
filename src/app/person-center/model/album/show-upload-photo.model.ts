/**
 * 显示上传相片的模型
 */
export class ShowUploadPhoto {
  path: string;
  width: number;
  height: number;

  zoomSize:number;
  fileName: string;
  fontSize:string;
  waterMark:string;
  bright:number;
  contrast:number;
  sharpen:number;
  blurR:number;
  blurS:number;
  hasWaterMark:boolean;
  constructor() {
    this.bright=0;
    this.contrast=0;
    this.sharpen=50;
  }
}
