import { Component, OnInit } from '@angular/core';
import { FilmService } from '../../shared/services/film.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import { Router } from '@angular/router';
import { FilmDetailed } from '../../shared/models/i-film-detailed';
import { mergeMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { CommonService } from '../../shared/services/common.service';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.css']
})
export class FilmDetailsComponent implements OnInit {
  data$;
  film:FilmDetailed;
  imgPath:string = this.filmService.apiConfig.midImgPath;
  smallImgPath:string = this.filmService.apiConfig.smallImgPath;
  isLoading:boolean = true;


  constructor(
    private filmService: FilmService, 
    private service:  CommonService,
    private activeRouter:  ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getFilmData();
  }

  ngOnDestroy(): void {
    this.data$.unsubscribe();
  }

  getFilmData(){
    this.data$ = this.activeRouter.paramMap.pipe(
      mergeMap((params:ParamMap) => {
        let id = +params.get("id");
        return forkJoin(
          this.filmService.getDetails(id),
          this.filmService.getFilmImages(id),
          this.filmService.getFilmActors(id)
        ) 
      })
    );

    this.data$.subscribe(
      data => { 
        this.film = this.filmService.prepareData(data);
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      },
      err => console.log(err)
    )
  }

  ratingColor = (average) => this.service.ratingColor(average);

}
