import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/model/project';

@Component({
  selector: 'app-project-list-item',
  templateUrl: './project-list-item.component.html',
  styleUrls: ['./project-list-item.component.css']
})
export class ProjectListItemComponent implements OnInit {
  @Input() project: Project;
  @Input() border: boolean;
  constructor() { }

  ngOnInit() {
  }

}