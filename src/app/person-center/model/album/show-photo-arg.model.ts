import {ShowAlbum} from "./show-album.model";
import {Photo} from "./add-photo.model";
import {ArtArgs} from "../../../share/model/base/art-args.model";
export class ShowPhotoArg {
  album:ShowAlbum;
  photos:Photo[];
  currentIndex:number;
  artArgs:ArtArgs;
}
