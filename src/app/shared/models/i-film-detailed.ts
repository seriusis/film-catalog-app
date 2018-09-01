import { FilmDetailedDetails } from '../models/i-film-detailed-details';
import { FilmDetailedGallery } from '../models/i-film-detailed-gallery';
import { FilmDetailedCast } from '../models/i-film-detailed-cast';

export class FilmDetailed{
    details: FilmDetailedDetails;
    gallery: Array<FilmDetailedGallery>;
    cast: Array<FilmDetailedCast>
}