import { Component, OnInit, ViewEncapsulation, Renderer } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import * as _underscore from 'underscore';

// Import the DataService
import { DataService } from '../data.service';


 // Load the Google Transliterate API
declare let google: any;

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
  translatornames:string = '';
  features: Array<any>;
  feature:string = '';
  series:string = '';
  fulltext:string = '';
  year:string = '';
  elid:string;
  googleLocal:any;
  
  constructor( private route: ActivatedRoute, private router: Router, private _dataService: DataService, private renderer: Renderer) { }

  ngOnInit() {
  
    // this.googleLocal = new google;

    // this._http.get("https://www.google.com/jsapi");

    google.load("elements", "1", {
        packages: "transliteration",
        callback: onLoad
    });

    // google.setOnLoadCallback(onLoad);

    function onLoad() {
        var options = {
            sourceLanguage: 'en', // or google.elements.transliteration.LanguageCode.ENGLISH,
            destinationLanguage: ['hi'], // or [google.elements.transliteration.LanguageCode.HINDI],
            shortcutKey: 'ctrl+g',
            transliterationEnabled: true
        };
        // Create an instance on TransliterationControl with the required
        // options.
        var control = new google.elements.transliteration.TransliterationControl(options);

        // Enable transliteration in the textfields with the given ids.
        var ids = ["title", "authornames", "translatornames", "feature", "series", "fulltext"];
        control.makeTransliteratable(ids);

        // Show the transliteration control which can be used to toggle between
        // English and Hindi.
        // control.showControl('translControl');
    }

    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this._dataService.getFeaturesList())
      .subscribe(res => {
        this.features = res;
    });
  }

  onSubmit(form: any) {

    form = _underscore.pick(form, _underscore.identity);
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

      case 'translatornames' :
        
        this.translatornames = (this.translatornames) ? this.translatornames + text : text;
        break;

      case 'feature' :
        
        this.feature = (this.feature) ? this.feature + text : text;
        setTimeout(() => this.renderer.selectRootElement('#feature').focus(), 0);

        break;

      case 'series' :
        
        this.series = (this.series) ? this.series + text : text;
        break;

      case 'fulltext' :
        
        this.fulltext = (this.fulltext) ? this.fulltext + text : text;
        break;
    }
  }
}
