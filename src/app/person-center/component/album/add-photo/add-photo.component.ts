import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.css']
})
export class AddPhotoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  closeAddPhotoDialog(close:HTMLButtonElement){
    close.click();
  }
  uploadPhoto(event){

  }
}
