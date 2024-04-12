import { Component, OnInit } from '@angular/core';
import { SubmissionsService } from '../../submissions.service';
import { Submission } from '../../models/submission';

@Component({
  selector: 'app-submissions-list',
  templateUrl: './submissions-list.component.html',
  styleUrls: ['./submissions-list.component.css']
})
export class SubmissionsListComponent implements OnInit {

  submissionsData: Submission[] = [];

  constructor(private submissionsService: SubmissionsService) {}

  ngOnInit(): void {
    this.submissionsService.getAllSubmissions().subscribe(data => {

      this.submissionsData = data;
    })
  }
}
