import { InjectionToken } from '@angular/core';
import {Config} from '../../shared//models/i-config';


export const apiConfig = {
    apiUrl: "https://api.themoviedb.org/3",
    apiKey: 'aeac1e0efd0dc4ec1b8bc5ebc5024f59',
    movieUrl: 'https://api.themoviedb.org/3/movie',
    searchUrl: 'https://api.themoviedb.org/3/search',
    personUrl: 'https://api.themoviedb.org/3/person',
    topRatedURL: 'https://api.themoviedb.org/3/movie/top_rated',
    nowPlaying: 'https://api.themoviedb.org/3/movie/now_playing',
    params: "&api_key=aeac1e0efd0dc4ec1b8bc5ebc5024f59&language=ru-RU",
    midImgPath: 'https://image.tmdb.org/t/p/w500',
    smallImgPath: 'https://image.tmdb.org/t/p/w185',
    bigBackPath: 'https://image.tmdb.org/t/p/w1280',
    midBackPath: 'https://image.tmdb.org/t/p/w780',
    smallBackPath: 'https://image.tmdb.org/t/p/w300',
}


export const API_CONFIG = new InjectionToken<Config>("");

