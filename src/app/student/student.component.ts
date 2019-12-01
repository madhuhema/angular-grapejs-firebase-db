import { Component, AfterViewInit } from '@angular/core';
import { DbService } from '../db.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements AfterViewInit {
  
  db;
  ngAfterViewInit(): void {
    this.db.init('student')
  }

  constructor(_db: DbService) {
    this.db = _db;
  }
}