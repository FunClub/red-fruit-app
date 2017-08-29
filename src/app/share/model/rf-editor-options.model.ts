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
  imageManagerLoadURL="http://i.froala.com/images";
  editorClass='editor-class';
  quickInsertButtons=null;
  htmlDoNotWrapTags=['script', 'img'];
  imageEditButtons=[];
  enter="$.FroalaEditor.ENTER_BR";
  /*  imageUploadURL="share/upload";*/
}
