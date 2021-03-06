import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { ProjectgroupDetailComponent } from './projectgroup-detail/projectgroup-detail.component';
import { AddProjectgroupDialogComponent } from './add-projectgroup-dialog/add-projectgroup-dialog.component';
import { ProjectListItemComponent } from './projectgroup-detail/project-list-item/project-list-item.component';
import { FormsModule } from '@angular/forms';
import { AddProjectDialogComponent } from './projectgroup-detail/add-project-dialog/add-project-dialog.component';
import { EditProjectgroupDialogComponent } from './projectgroup-detail/edit-projectgroup-dialog/edit-projectgroup-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ProjectgroupService } from '../projectgroup.service';
import { ProjectgroupServiceStub } from 'src/testing/projectgroup.service.stub';
import { Projectgroup } from '../model/projectGroup';
import * as get_projectgroups_response from 'sample-requests/get.projectgroups.response.json';
import * as projectResponse from 'sample-requests/get.projects.id.response.json';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { EnumToArrayPipe } from '../enum-to-array.pipe';
import { NotificationService } from '../notification.service';
import { NotificationServiceStub } from 'src/testing/notification-service-stub';
import { Project } from '../model/project';
import { ProjectService } from '../project.service';
import { ProjectServiceStub } from 'src/testing/project-service-stub';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  const response: Projectgroup[] = get_projectgroups_response['default'];
  const project: Project = projectResponse['default'];
  const snapshot = new ActivatedRouteSnapshot();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent, ProjectgroupDetailComponent,
        AddProjectgroupDialogComponent, ProjectListItemComponent,
        AddProjectDialogComponent, EditProjectgroupDialogComponent, EnumToArrayPipe],
      imports: [FormsModule, RouterTestingModule],
      providers: [
        { provide: ProjectgroupService, useClass: ProjectgroupServiceStub },
        {
          // Mock ActivatedRoute because a unit test can't have a "real" route
          provide: ActivatedRoute, useClass: class {
            snapshot = snapshot; data = of({ groups: get_projectgroups_response['default'] });
          }
        },
        {
          provide: NotificationService, useClass: NotificationServiceStub
        },
        {
          provide: ProjectService, useClass: ProjectServiceStub
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list projectgroups', () => {
    const nativeElement: HTMLElement = fixture.nativeElement;
    const groupDetails: NodeListOf<Element> = nativeElement.querySelectorAll('app-projectgroup-detail');

    expect(groupDetails.length).toBe(response.length);
    expect(groupDetails[0].querySelector('h4').textContent).toBe(response[0].name);
    expect(groupDetails[1].querySelector('h4').textContent).toBe(response[1].name);
  });

  it('should create button', () => {
    const nativeElement: HTMLElement = fixture.nativeElement;
    expect(nativeElement.querySelector('button').textContent).toBe('Toggle All');
  });

  it('should handle project changed', () => {
    const notService: NotificationService = TestBed.get(NotificationService);
    spyOn(notService, 'sendInfo');
    component.projectGroups[0].projects = [projectResponse['default']];
    const evt = new MessageEvent('init_project', {
      data: `{ "projectId": ${project['id']},
            "name": "${projectResponse['name']}", "message":"serviceaccount_changed" }`
    });
    component.handleProjectChanged(evt);
    expect(notService.sendInfo).toHaveBeenCalledWith('serviceaccount_changed', undefined, project['id'], undefined);
  });

  it('should refresh projects', () => {
    const notService: NotificationService = TestBed.get(NotificationService);
    spyOn(notService, 'sendSuccess');
    component.projectGroups[0].projects = [projectResponse['default']];
    const evt = new MessageEvent('project_refreshed', {
      data: `{ "projectId": ${project['id']},
            "name": "${project['name']}", "status":"SUCCESS", "message":"refresh_successful" }`
    });
    component.handleProjectRefreshed(evt);
    expect(notService.sendSuccess).toHaveBeenCalled();
  });

  it('should fail refresh projects', () => {
    const notService: NotificationService = TestBed.get(NotificationService);
    spyOn(notService, 'sendWarning');
    component.projectGroups[0].projects = [projectResponse['default']];
    const evt = new MessageEvent('project_refreshed', {
      data: `{ "projectId": ${project['id']},
            "name": "${project['name']}", "status":"FAILED", "message":"git_not_available" }`
    });
    component.handleProjectRefreshed(evt);
    expect(notService.sendWarning).toHaveBeenCalled();
  });

  it('should update buildstatus', () => {
    const notService: NotificationService = TestBed.get(NotificationService);
    spyOn(notService, 'sendSuccess');
    const evt = new MessageEvent('build_updated', {
      data: `{ "projectId": ${project['id']}, "name":"master", "status": "SUCCESS"}`
    });
    component.handleBuildUpdated(evt);
    expect(notService.sendSuccess).toHaveBeenCalledWith('build_success', 'master', project['id'], undefined);
  });

  it('should update buildstatus failed', () => {
    const notService: NotificationService = TestBed.get(NotificationService);
    spyOn(notService, 'sendWarning');
    const evt = new MessageEvent('build_updated', {
      data: `{ "projectId": ${project['id']}, "name":"master", "status": "FAILED", "message":"build_failed"}`
    });
    component.handleBuildUpdated(evt);
    expect(notService.sendWarning).toHaveBeenCalledWith('build_failed', 'master', project['id'], undefined);
  });

  it('should toggle true groups', () => {
    component.showAll = true;
    component.toggleGroups();
    expect(component.showAll).toBeFalsy();
  });

  it('should toggle false groups', () => {
    component.showAll = false;
    component.toggleGroups();
    expect(component.showAll).toBeTruthy();
  });
});
