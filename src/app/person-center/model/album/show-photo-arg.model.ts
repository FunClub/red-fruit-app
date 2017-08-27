import {ShowAlbum} from "./show-album.model";
import {Photo, ShowPhoto} from "./add-photo.model";
import {ArtArgs} from "../../../share/model/base/art-args.model";
/*显示详细相片的参数*/
export class ShowPhotoArg {
  album:ShowAlbum;
  photos:ShowPhoto[];
  currentIndex:number;
}
