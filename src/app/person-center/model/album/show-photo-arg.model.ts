import {ShowAlbum} from "./show-album.model";
import {Photo} from "./add-photo.model";
export class ShowPhotoArg {
  album:ShowAlbum;
  photos:Photo[];
  currentIndex:number;
}
