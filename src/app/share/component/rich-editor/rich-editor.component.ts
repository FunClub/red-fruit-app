import {Component, Input, OnInit} from '@angular/core';
import {Note} from "../../../person-center/model/note/note.model";
import {RfEditorOptions} from "../../model/base/rf-editor-options.model";
import {EditorArgs} from "../../model/base/editor-args";

@Component({
  selector: 'app-rich-editor',
  templateUrl: './rich-editor.component.html',
  styleUrls: ['./rich-editor.component.css']
})
export class RichEditorComponent implements OnInit {

  @Input()
  editorArgs:EditorArgs;
  /**
   * 编辑器配置
   */
  editorOption:RfEditorOptions;
  constructor() {
    this.editorOption = new RfEditorOptions();
  }

  ngOnInit() {
    this.initEditor();

  }
  initEditor(){
    this.editorOption.heightMin=300;
    this.editorOption.enter="$.FroalaEditor.ENTER_P";
    this.editorOption.toolbarButtons=['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', '|', 'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'print', 'spellChecker', 'help', 'html', '|', 'undo', 'redo'];
    this.editorOption.imageEditButtons=['imageReplace', 'imageAlign', 'imageRemove', '|', 'imageLink', 'linkOpen', 'linkEdit', 'linkRemove', '-', 'imageDisplay', 'imageStyle', 'imageAlt', 'imageSize'];
  }
}
