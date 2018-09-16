import { Component, OnInit, ViewEncapsulation, Input, ViewChild, Inject } from '@angular/core';
import { FilmService } from '../../shared/services/film.service';
import { FavoriteApiService } from '../../shared/services/favorite.api.service';
import { BookmarkApiService } from '../../shared/services/bookmark.api.service';
import { Film } from '../../shared/models/i-film';
import { FilmsResults } from '../../shared/models/i-films-results';
import { SearchResults } from '../../shared/models/i-search-results';
import { PersonsResults } from '../../shared/models/i-persons-results';
import { Bookmark } from '../../shared/models/i-bookmark';
import { Favorite } from '../../shared/models/i-favorite';
import {API_CONFIG} from '../../shared/configs/config';
import {Config} from '../../shared/models/i-config';
import {SearchComponent} from '../search/search.component'


@Component({
  selector: '.films',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {
  items: Array<Film> = [];
  favoriteList:Array<Favorite> = [];
  imgPath:string = this.filmService.apiConfig.midImgPath;
  pageInfo = {
    currentPage : 1,
    totalPages : null,
    totalResults : null,
    lastPage : null
  }
  @ViewChild(SearchComponent) search:SearchComponent; //смотрим строку поиска
  isLoading:boolean = true;
  searchText = 'Поиск фильма';
  

  
  constructor(
    private filmService: FilmService, 
    private favoriteService: FavoriteApiService, 
    private bookmarkService : BookmarkApiService,
    @Inject(API_CONFIG) public config: Config
  ){}

  ngOnInit() {
    this.getFilms();
  }

  saveData(items, curPage,  totalPages, totalRes){
    this.items = items;
    this.pageInfo.currentPage = curPage;
    this.pageInfo.totalPages =  totalPages;
    this.pageInfo.totalResults = totalRes;
    this.isLoading = false;
  }

  getFilms(page = this.pageInfo.currentPage){
    this.filmService.getFilms(page, this.search.searchQuery).subscribe(
      (films: FilmsResults) => {
        this.saveData(films.results, films.page,  films.total_pages, films.total_results);
         this.buildFavorites();
         this.buildBookmarks();
      },
      err => { console.log("films request error");
      })  
  }
      
  goLastPage(){
    this.isLoading = true;
    this.pageInfo.currentPage = this.pageInfo.totalPages;
    this.getFilms()
  }

  goFirstPage(){
    this.isLoading = true;
    this.getFilms(1)
  }

  showMore(){
    this.isLoading = true;
    this.pageInfo.currentPage++; 
    this.getFilms();
  }

  clearRes(){
    this.getFilms(1);
  }

  trackByFn = (index, item) => item.id;

  get CurrentPage(){
    return this.pageInfo.currentPage;
  }
  get TotalPages(){
    return this.pageInfo.totalPages;
  }
  get TotalRes(){
    return this.pageInfo.totalResults;
  }

  get isLastPage(){
    return this.pageInfo.currentPage == this.pageInfo.totalPages
  }
  get isFirstPage(){
    return this.pageInfo.currentPage == 1;
  }


  buildFavorites(){
    this.favoriteService.getFavoriteList().subscribe(
      (favoritesIds: Array<number>) => {
        this.items.forEach(film => film.isFavorite = favoritesIds.indexOf(film.id) > -1);
      },
      err => console.log("favorites request error")
    );
  }
  
  buildBookmarks(){
    this.bookmarkService.getBookmarkList().subscribe(
      (bookmarksIds: Array<number>) => {
        this.items.forEach(film => film.isBookmark = bookmarksIds.indexOf(film.id) > -1);
      }
    );
  }


  onUpdateFavorite(id:number){
    let currentFilm = this.items.find(film => film.id == id);
    if(currentFilm.isFavorite){
      this.favoriteService.removeFromFavorite(id).subscribe(() => this.buildFavorites());
    } else {
      this.favoriteService.addToFavorite(id).subscribe(() => this.buildFavorites());
    }
  }

  onUpdateBookmark(id:number){
    let currentFilm = this.items.find(film => film.id == id);
    if(currentFilm.isBookmark){
      this.bookmarkService.removeFromBookmark(id).subscribe(() => this.buildBookmarks());
    } else {
      this.bookmarkService.addToBookmark(id).subscribe(() => this.buildBookmarks());
    }
  }


}
        