import { Component, AfterViewInit } from '@angular/core';
import { DbService } from './db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  
  db;
  ngAfterViewInit(): void {
    this.db.init('student')
  }

  constructor(_db: DbService) {
    this.db = _db;
  }
}
