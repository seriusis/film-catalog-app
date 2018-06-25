import { Component, OnInit, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { FilmService } from '../film.service';
import { SearchComponent } from './search/search.component';


@Component({
  selector: '.films',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {
  @ViewChild(SearchComponent) searchComp: SearchComponent;
  items = [];
  imgPath = this.filmsService.midImgPath;
  activeView = 'films';
  pageInfo = {
    currentPage : 1,
    totalPages : null,
    totalResults : null,
    lastPage : null
  }
  searchQuery:string;
  searchStatus:boolean = false;
  isLoading:boolean = true;

  
  constructor(private filmsService: FilmService) {}
  ngOnInit() {
    this.getFilms();
  }

  saveData(items, curPage,  totalPages, totalRes){
    this.items = items;
    this.pageInfo.currentPage = curPage;
    this.pageInfo.totalPages =  totalPages;
    this.pageInfo.totalResults = totalRes
    this.isLoading = false;
  }

  getFilms(page?){
    this.filmsService.getPopularFilms(page ? page : this.pageInfo.currentPage).subscribe(
      (films: any) => {
        this.saveData(films.results, films.page,  films.total_pages, films.total_results);
      },
      err => { console.log("films request error");
      })  
  }

  getPersons(page?){
    this.filmsService.getPopularPerson(page ? page : this.pageInfo.currentPage).subscribe(
      (person: any) => {
          this.saveData(person.results, person.page,  person.total_pages, person.total_results);//посм. деструкт
      },
      err => {
        console.log("person request error");
      }
    )
  }

  searchMovie(query, page?){//типы
    this.filmsService.searchMovie(query, page ? page : this.pageInfo.currentPage).subscribe(
      (results: any) => {
          this.saveData(results.results, results.page,  results.total_pages, results.total_results);
      },
      err => {
        console.log("person request error");
      }
    )
  }

  searchPerson(query, page?){
    this.filmsService.searchPerson(query, page ? page : this.pageInfo.currentPage).subscribe(
      (results: any) => {
          this.saveData(results.results, results.page,  results.total_pages, results.total_results);
      },
      err => {
        console.log("search request error");
      }
    )
  }

  updatePageAndViewConfig(){
    this.pageInfo.currentPage = 1;
    this.searchComp.searchQuery = '';//нормально ?
    this.searchStatus = false;
  }

  changeView(){
    this.updatePageAndViewConfig();
    if(this.activeView == 'films'){
      this.isLoading = true;
      this.items = [];
      this.getFilms();
    } else {
      this.isLoading = true;
      this.items = [];
      this.getPersons();
    }
  }

  searchItems(value){
    if(value.length > 2){//вал if <2
      this.isLoading = true;
      this.searchStatus = true;
      this.activeView == 'films' && this.searchMovie(value);
      this.activeView == 'persons' && this.searchPerson(value);
    } else {
      this.isLoading = true;
      this.searchStatus = false;
      this.activeView == 'films' && this.getFilms(1);
      this.activeView == 'persons' && this.getPersons(1);
    }
  }

  isLastPage = () => this.pageInfo.currentPage == this.pageInfo.totalPages;
   
  goLastPage(){
    this.isLoading = true;
    this.pageInfo.currentPage = this.pageInfo.totalPages;
    if(this.searchStatus){
      this.searchItems(this.searchQuery)
    } else {
      this.activeView == 'films' && this.getFilms(this.pageInfo.lastPage);
      this.activeView == 'persons' && this.getPersons(this.pageInfo.lastPage);
    }
  }

  goFirstPage(){
    this.isLoading = true;
    this.pageInfo.currentPage = 1;
    if(this.searchStatus){
      this.searchItems(this.searchQuery);
    } else {
      this.activeView == 'films' && this.getFilms(1);
      this.activeView == 'persons' && this.getPersons(1);
    }
  }

  showMore(){
    this.isLoading = true;
    this.pageInfo.currentPage++;
    if(this.searchStatus){
      this.searchItems(this.searchQuery);
    } else {
      this.activeView == 'films' && this.getFilms();
      this.activeView == 'persons' && this.getPersons();
    }
  }

  trackByFn = (index, item) => item.id;

}
       