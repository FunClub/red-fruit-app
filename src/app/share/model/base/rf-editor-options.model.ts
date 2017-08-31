export class RfEditorOptions {
  language="zh_cn";
  toolbarButtons= ['emoticons','insertImage','bold','color','insertLink','fullscreen', 'html','undo', 'redo'];
  toolbarButtonsSM=['emoticons','insertImage','bold','color','insertLink','fullscreen', 'html','undo', 'redo'];
  toolbarButtonsXS=['emoticons','insertImage','bold','color','insertLink','fullscreen', 'html','undo', 'redo'];
  heightMax=300;
  heightMin=80;
  height;
  tabSpaces=4;
  toolbarBottom=false;
  placeholderText= "书写青春....";
  imageResize=true;
  imageManagerLoadURL="album/editor-photo";
  editorClass='editor-class';
  htmlDoNotWrapTags=['script', 'img'];
  imageEditButtons=[];
  enter="$.FroalaEditor.ENTER_BR";
  /*  imageUploadURL="share/upload";*/
}
