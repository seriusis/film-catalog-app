import { InjectionToken } from '@angular/core';
import {Config} from '../../shared//models/i-config';


export const apiConfig = {
    apiUrl: "https://api.themoviedb.org/3",
    authUrl : 'https://api.themoviedb.org/3/authentication',
    apiKey: 'a3ad8917a6fee8c166a5c150345bc150',
    movieUrl: 'https://api.themoviedb.org/3/movie',
    searchUrl: 'https://api.themoviedb.org/3/search',
    personUrl: 'https://api.themoviedb.org/3/person',
    topRatedURL: 'https://api.themoviedb.org/3/movie/top_rated',
    nowPlaying: 'https://api.themoviedb.org/3/movie/now_playing',
    params: "&api_key=a3ad8917a6fee8c166a5c150345bc150&language=ru-RU",
    midImgPath: 'https://image.tmdb.org/t/p/w500',
    smallImgPath: 'https://image.tmdb.org/t/p/w185',
    bigBackPath: 'https://image.tmdb.org/t/p/w1280',
    midBackPath: 'https://image.tmdb.org/t/p/w780',
    smallBackPath: 'https://image.tmdb.org/t/p/w300',
   
}


export const API_CONFIG = new InjectionToken<Config>("");

