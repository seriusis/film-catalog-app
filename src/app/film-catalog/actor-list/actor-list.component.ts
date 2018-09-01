import { Component, OnInit, ViewEncapsulation, Input, ViewChild, Inject } from '@angular/core';
import { ActorService } from '../../shared/services/actor.service';
import { Film } from '../../shared/models/i-film';
import { FilmsResults } from '../../shared/models/i-films-results';
import { SearchResults } from '../../shared/models/i-search-results';
import { PersonsResults } from '../../shared/models/i-persons-results';
import {API_CONFIG} from '../../shared/configs/config';
import {Config} from '../../shared/models/i-config';
import {SearchComponent} from '../search/search.component'

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrls: ['./actor-list.component.css']
})
export class ActorListComponent implements OnInit {

  items: Array<Film> = [];
  // favoriteList:Array<Favorite> = [];
  imgPath:string = this.actorService.apiConfig.midImgPath;
  pageInfo = {
    currentPage : 1,
    totalPages : null,
    totalResults : null,
    lastPage : null
  }

  @ViewChild(SearchComponent) search:SearchComponent; //смотрим строку поиска
  isLoading:boolean = true;
  searchText = 'Поиск актера';

  constructor(    private actorService: ActorService, 
    // private favoriteService: FavoriteApiService, 
    // private bookmarkService : BookmarkApiService,
    @Inject(API_CONFIG) public config: Config) {}

  ngOnInit() {
    this.getPersons();
  }


  saveData(items, curPage,  totalPages, totalRes){
    this.items = items;
    this.pageInfo.currentPage = curPage;
    this.pageInfo.totalPages =  totalPages;
    this.pageInfo.totalResults = totalRes
    this.isLoading = false;
  }

  getPersons(page = this.pageInfo.currentPage){
    this.actorService.getPersons(page, this.search.searchQuery).subscribe(
      (person: PersonsResults) => {
          this.saveData(person.results, person.page,  person.total_pages, person.total_results);
      },
      err => {
        console.log("person request error");
      }
    )
  }

    
  goLastPage(){
    this.isLoading = true;
    this.pageInfo.currentPage = this.pageInfo.totalPages;
    this.getPersons();
  }

  goFirstPage(){
    this.isLoading = true;
    this.getPersons(1);
  }

  showMore(){
    this.isLoading = true;
    this.pageInfo.currentPage++; 
    this.getPersons();
  }

  clearRes(){
    this.getPersons(1);
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

}
