import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sigle-mood',
  templateUrl: './sigle-mood.component.html',
  styleUrls: ['./sigle-mood.component.css']
})
export class SigleMoodComponent implements OnInit {

  constructor() { }

  images: any[];

  ngOnInit() {
    this.images = [];
   this.images.push({source:'assets/resource/20160805113318333520926A.jpeg', thumbnail: 'assets/resource/20160805113318333520926A.jpeg', title:'Sopranos 1'});
    this.images.push({source:'assets/resource/20160805113321841093627C.jpg', thumbnail: 'assets/resource/20160805113321841093627C.jpg', title:'Sopranos 1'});

    this.images.push({source:'assets/resource/20160805113318333520926A.jpeg', thumbnail: 'assets/resource/20160805113318333520926A.jpeg', title:'Sopranos 1'});
    this.images.push({source:'assets/resource/20160805113321841093627C.jpg', thumbnail: 'assets/resource/20160805113321841093627C.jpg', title:'Sopranos 1'});   this.images.push({source:'assets/resource/20160805113318333520926A.jpeg', thumbnail: 'assets/resource/20160805113318333520926A.jpeg', title:'Sopranos 1'});
    this.images.push({source:'assets/resource/20160805113321841093627C.jpg', thumbnail: 'assets/resource/20160805113321841093627C.jpg', title:'Sopranos 1'});   this.images.push({source:'assets/resource/20160805113318333520926A.jpeg', thumbnail: 'assets/resource/20160805113318333520926A.jpeg', title:'Sopranos 1'});
    this.images.push({source:'assets/resource/20160805113321841093627C.jpg', thumbnail: 'assets/resource/20160805113321841093627C.jpg', title:'Sopranos 1'});   this.images.push({source:'assets/resource/20160805113318333520926A.jpeg', thumbnail: 'assets/resource/20160805113318333520926A.jpeg', title:'Sopranos 1'});
    this.images.push({source:'assets/resource/20160805113321841093627C.jpg', thumbnail: 'assets/resource/20160805113321841093627C.jpg', title:'Sopranos 1'});   this.images.push({source:'assets/resource/20160805113318333520926A.jpeg', thumbnail: 'assets/resource/20160805113318333520926A.jpeg', title:'Sopranos 1'});
    this.images.push({source:'assets/resource/20160805113321841093627C.jpg', thumbnail: 'assets/resource/20160805113321841093627C.jpg', title:'Sopranos 1'});   this.images.push({source:'assets/resource/20160805113318333520926A.jpeg', thumbnail: 'assets/resource/20160805113318333520926A.jpeg', title:'Sopranos 1'});
    this.images.push({source:'assets/resource/20160805113321841093627C.jpg', thumbnail: 'assets/resource/20160805113321841093627C.jpg', title:'Sopranos 1'});   this.images.push({source:'assets/resource/20160805113318333520926A.jpeg', thumbnail: 'assets/resource/20160805113318333520926A.jpeg', title:'Sopranos 1'});
    this.images.push({source:'assets/resource/20160805113321841093627C.jpg', thumbnail: 'assets/resource/20160805113321841093627C.jpg', title:'Sopranos 1'});   this.images.push({source:'assets/resource/20160805113318333520926A.jpeg', thumbnail: 'assets/resource/20160805113318333520926A.jpeg', title:'Sopranos 1'});
    this.images.push({source:'assets/resource/20160805113321841093627C.jpg', thumbnail: 'assets/resource/20160805113321841093627C.jpg', title:'Sopranos 1'});
  }

}
