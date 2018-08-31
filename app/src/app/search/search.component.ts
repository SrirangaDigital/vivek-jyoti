import { Component, OnInit, ViewEncapsulation, Renderer } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import * as _underscore from 'underscore';

// Import the DataService
import { DataService } from '../data.service';


 // Load the Google Transliterate API
declare let google: any;

export interface Author {
  author: string;
  roman: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {

  searchForm = new FormGroup({
    title: new FormControl(''),
    authornames: new FormControl(''),
    translatornames: new FormControl(''),
    feature: new FormControl(''),
    series: new FormControl(''),
    fulltext: new FormControl(''),
    year: new FormControl('')
  });

  elid:string;
  googleLocal:any;
  
  features: Array<any>;
  authors: Array<any>;

  filteredAuthorOptions: Observable<string[]>;
  
  constructor( private route: ActivatedRoute, private router: Router, private _dataService: DataService, private renderer: Renderer) { }

  ngOnInit() {
    
    google.load("elements", "1", {
        packages: "transliteration",
        callback: onLoad
    });

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
    }

    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this._dataService.getFeaturesList())
      .subscribe(res => {
        this.features = res;
    });

    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this._dataService.getAllAuthors())
      .subscribe(res => {
        this.authors = res;


        this.filteredAuthorOptions = this.searchForm.get('authornames').valueChanges
          .pipe(
            map(value => value ? this._filter(value) : this.authors.slice())
          );
    });
  }

  private _filter(value: string): Author[] {

    const filterValue = value.toLowerCase();

    return this.authors.filter(option => option.author.toLowerCase().includes(filterValue));
  }

  // displayAuthor(user?: Author): string | undefined {
    
  //   return user ? user.author : undefined;
  // }

  onSubmit() {

    var form = _underscore.pick(this.searchForm.value, _underscore.identity);
	  this.router.navigate(['/searchResults'], { queryParams:  form });
  }

  onFocus(field: string) {

    this.elid = field;
    console.log(this.elid);
  }

  insertText(text: string) {

     switch (this.elid) {

      case 'title' :
        
        var title = this.searchForm.get('title').value;
        title = title ? title + text : text;
        this.searchForm.get('title').setValue(title);
        break;

      case 'authornames' :
        
        var authornames = this.searchForm.get('authornames').value;
        authornames = authornames ? authornames + text : text;
        this.searchForm.get('authornames').setValue(authornames);
        break;

      case 'translatornames' :
        
        var translatornames = this.searchForm.get('translatornames').value;
        translatornames = translatornames ? translatornames + text : text;
        this.searchForm.get('translatornames').setValue(translatornames);
        break;

      case 'feature' :
        
        var feature = this.searchForm.get('feature').value;
        feature = feature ? feature + text : text;
        this.searchForm.get('feature').setValue(feature);
        setTimeout(() => this.renderer.selectRootElement('#feature').focus(), 0);

        break;

      case 'series' :
        
        var series = this.searchForm.get('series').value;
        series = series ? series + text : text;
        this.searchForm.get('series').setValue(series);
        break;

      case 'fulltext' :
        
        var fulltext = this.searchForm.get('fulltext').value;
        fulltext = fulltext ? fulltext + text : text;
        this.searchForm.get('fulltext').setValue(fulltext);
        break;
    }
  }
}
