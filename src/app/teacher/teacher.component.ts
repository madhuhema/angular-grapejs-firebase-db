import { Component, AfterViewInit } from '@angular/core';
import { DbService } from '../db.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements AfterViewInit {
  
  db;
  ngAfterViewInit(): void {
    this.db.init('teacher')
  }

  constructor(_db: DbService) {
    this.db = _db;
  }
}
