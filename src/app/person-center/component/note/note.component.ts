import { Component, OnInit } from '@angular/core';
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";
import {RfEditorOptions} from "../../../share/model/rf-editor-options.model";
import {RedFruitApi} from "../../../share/model/base/api.model";
import {limit,noteType} from "../../../share/model/base/static-data.model"
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
  animations: [
    trigger('flyXInOutFromTop', [
      transition('void => *', [
        animate("300ms",keyframes([
          style({opacity: 0, transform: 'translateY(-50px)', offset: 0}),
          style({opacity: 0.5, transform: 'translateY(5px)',  offset: 0.5}),
          style({opacity: 1, transform: 'translateY(0)',     offset: 1.0})
        ]))
      ]),
      transition('* => void', [
        animate("300ms",keyframes([
          style({opacity: 1, transform: 'translateY(0)',offset:0}),
          style({opacity: 0.5, transform: 'translateY(5px)',offset:0}),
          style({opacity: 0, transform: 'translateY(-50px)',offset:0})
        ]))
      ])
    ]),
    trigger('flyXInOutFromRight', [
      transition('void => *', [
        animate("500ms",keyframes([
          style({opacity: 0, transform: 'translateX(-5%)', offset: 0}),
          style({opacity: 0.5, transform: 'translateX(-5px)',  offset: 0.3}),
          style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
        ]))
      ]),

    ]),
  ]
})
export class NoteComponent implements OnInit {
  img="http://red-fruit.oss-cn-shenzhen.aliyuncs.com/profile/20170816100859-389213348prfile.jpg";
  /**
   * 是否显示写日志div
   */
  showWriteNote:boolean;

  /**
   * 编辑器配置
   */
  editorOption:RfEditorOptions;

  /**
   * 日志类型
   */
  noteTypes:any;
  constructor(private api:RedFruitApi) {
    this.editorOption = new RfEditorOptions();
    this.noteTypes=noteType;
  }
  initEditor(){
    this.editorOption.heightMin=300;
    this.editorOption.toolbarButtons=['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', '|', 'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'print', 'spellChecker', 'help', 'html', '|', 'undo', 'redo'];
    this.editorOption.imageManagerLoadURL=this.api.EDITOR_PHOTO;
    this.editorOption.imageEditButtons=['imageReplace', 'imageAlign', 'imageRemove', '|', 'imageLink', 'linkOpen', 'linkEdit', 'linkRemove', '-', 'imageDisplay', 'imageStyle', 'imageAlt', 'imageSize'];
  }
  ngOnInit() {
    this.initEditor();
  }
  toggleWriteNote(){
    this.showWriteNote=!this.showWriteNote;
  }
}
