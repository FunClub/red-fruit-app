import {Component, Input, OnInit} from '@angular/core';
import {ShowCatalogNote} from "../../../model/note/note.model";
import {RedFruitApi} from "../../../../share/model/base/api.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-single-catalog-note',
  templateUrl: './single-catalog-note.component.html',
  styleUrls: ['./single-catalog-note.component.css']
})
export class SingleCatalogNoteComponent implements OnInit {

  @Input()
  catalogNote:ShowCatalogNote;
  constructor(public api:RedFruitApi,private router:Router) { }

  ngOnInit() {
  }
  selectNote(){
    this.router.navigate(["home/person-center/note",this.catalogNote.noteId]);
  }
}
