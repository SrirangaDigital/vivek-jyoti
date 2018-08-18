import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {

  search:Array<any>;
  title:String;
  authornames:String;
  feature:String;
  series:String;
  fulltext:String;
  year:String;
  
  constructor( private route: ActivatedRoute, private router: Router ) { }

  ngOnInit() { }

  onSubmit(form: any) {

	  this.router.navigate(['/searchResults'], { queryParams:  form });
  }
}
