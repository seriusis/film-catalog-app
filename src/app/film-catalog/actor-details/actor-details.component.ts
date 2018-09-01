import { Component, OnInit } from '@angular/core';
import { ActorService } from '../../shared/services/actor.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import { Router } from '@angular/router';
import { ActorDetailed } from '../../shared/models/i-actor-detailed';
import { mergeMap } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-actor-details',
  templateUrl: './actor-details.component.html',
  styleUrls: ['./actor-details.component.css']
})
export class ActorDetailsComponent implements OnInit {

  constructor(
    private actorService: ActorService, 
    private activeRouter:  ActivatedRoute,
    private router: Router
  ) { }

  data$;
  actor:ActorDetailed;
  imgPath:string = this.actorService.apiConfig.midImgPath;
  smallImgPath:string = this.actorService.apiConfig.smallImgPath;
  isLoading:boolean = true;

  ngOnInit() {
    this.getActorData();
  }

  ngOnDestroy(): void {
    this.data$.unsubscribe();
  }

  getActorData(){
    this.data$ = this.activeRouter.paramMap.pipe(
      mergeMap((params:ParamMap) => {
        let id = +params.get("id");
        return forkJoin(
          this.actorService.getDetails(id),
          this.actorService.getActorCasts(id)
        );
      })
    );

    this.data$.subscribe(
      data => { 
        this.actor = this.actorService.prepareData(data);
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      },
      err => console.log(err)
    )
  }

}
