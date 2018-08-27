import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import * as _underscore from 'underscore';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {

  search:Array<any>;
  title:string = '';
  authornames:string = '';
  feature:string = '';
  series:string = '';
  fulltext:string = '';
  year:string = '';
  elid:string;
  
  constructor( private route: ActivatedRoute, private router: Router ) { }

  ngOnInit() { }

  onSubmit(form: any) {

    form = _underscore.pick(form, _underscore.identity;
	  this.router.navigate(['/searchResults'], { queryParams:  form });
  }

  onFocus(field: string) {

    this.elid = field;
    console.log(this.elid);
  }

  insertText(text: string) {

     switch (this.elid) {

      case 'title' :
        
        this.title = (this.title) ? this.title + text : text;
        break;

      case 'authornames' :
        
        this.authornames = (this.authornames) ? this.authornames + text : text;
        break;

      case 'feature' :
        
        this.feature = (this.feature) ? this.feature + text : text;
        break;

      case 'series' :
        
        this.series = (this.series) ? this.series + text : text;
        break;

      case 'fulltext' :
        
        this.fulltext = (this.fulltext) ? this.fulltext + text : text;
        break;
  }
}
