import { Component, OnInit, ViewEncapsulation, Renderer } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Lightbox, LightboxEvent, LIGHTBOX_EVENT } from 'ngx-lightbox';
import 'rxjs/add/operator/switchMap';
import { DatePipe } from '@angular/common';
import { RlzeroPipe } from '../custom-pipes/rlzero.pipe';
import { MonthToDevanagariPipe } from '../custom-pipes/monthToDevanagari.pipe';
import { ToDevanagariPipe } from '../custom-pipes/toDevanagari.pipe';
import { Subscription } from 'rxjs';

// Import the DataService
import { DataService } from '../data.service';

@Component({
  selector: 'app-covers',
  templateUrl: './covers.component.html',
  styleUrls: ['./covers.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe, RlzeroPipe, MonthToDevanagariPipe, ToDevanagariPipe]
})

export class CoversComponent implements OnInit {

  series: Array<any>;
  _album: Array<any> = [];
  private _subscription: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private _dataService: DataService, private _lightbox: Lightbox, private datePipe: DatePipe, private rlzeroPipe: RlzeroPipe, private monthToDevanagariPipe: MonthToDevanagariPipe, private toDevanagariPipe: ToDevanagariPipe, private _lightboxEvent: LightboxEvent, private renderer: Renderer ) { }

  open(index: number): void {
    // open lightbox
    this._subscription = this._lightboxEvent.lightboxEvent$
      .subscribe(event => this._onReceivedEvent(event));
    this._lightbox.open(this._album, index);
  }
   
  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }
  
  ngOnInit() {
  	
  	this.route.paramMap
  	  .switchMap((params: ParamMap) =>
  	    this._dataService.getCoversList())
  	  .subscribe(res => {
  	    this.series = res;

  	    let i = 1;
  	    this.series.forEach(item => {

    	    const src = 'assets/covers/main/' + item.volume + '_' + item.part + '_cover.jpg';
  		    const caption = this.monthToDevanagariPipe.transform(item.date)
  	          + ' '
  	          + this.toDevanagariPipe.transform(item.year)
  	          + ' (वर्ष '
  	          + this.toDevanagariPipe.transform(this.rlzeroPipe.transform(item.volume))
  	          + ', अंक '
  	          + this.toDevanagariPipe.transform(this.rlzeroPipe.transform(item.part))
  	          + ')';
  	          
  		    const thumb = 'assets/covers/thumbs/' + item.volume + '_' + item.part + '_cover.jpg';
  		    const album = {
  		      src: src,
  		      caption: caption,
  		      thumb: thumb
  		    };

  		    this._album.push(album);
  		    i++;
  	    });
  	  });
  }

  private _onReceivedEvent(event: any): void {
    // remember to unsubscribe the event when lightbox is closed
    if (event.id === LIGHTBOX_EVENT.CLOSE) {
      // event CLOSED is fired
      this._subscription.unsubscribe();
    }

    if (event.id === LIGHTBOX_EVENT.OPEN) {
      // event OPEN is fired

      console.log('Open page');
      console.log(event);
    }

    if (event.id === LIGHTBOX_EVENT.CHANGE_PAGE) {
      // event change page is fired
      console.log(event.data); // -> image index that lightbox is switched to
    }
  }
}
