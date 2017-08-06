export class RfEditorOptions {
  language="zh_cn";
  toolbarButtons= ['emoticons','insertImage','bold','color','insertLink','fullscreen', 'html','undo', 'redo'];
  toolbarButtonsSM=['emoticons','insertImage','bold','color','insertLink','fullscreen', 'html','undo', 'redo'];
  toolbarButtonsXS=['emoticons','insertImage','bold','color','insertLink','fullscreen', 'html','undo', 'redo'];
  heightMax=300;
  heightMin=80;
  tabSpaces=4;
  toolbarBottom=false;
  placeholderText= "书写青春....";
  imageDefaultDisplay= 'inline';
  imageDefaultWidth=90;
  imageResize=true;
  editorClass='editor-class';
  quickInsertButtons=null;
  htmlDoNotWrapTags=['script', 'style', 'img'];
  imageEditButtons=['imageReplace', 'imageAlign', 'imageRemove', '|', 'imageLink', 'linkOpen', 'linkEdit', 'linkRemove', '-', 'imageDisplay', 'imageStyle']
  enter="$.FroalaEditor.ENTER_BR";
  /*  imageUploadURL="share/upload";*/
}
