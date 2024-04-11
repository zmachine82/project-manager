import {  TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SubmissionsListComponent } from './submissions-list.component';
import { MockProvider } from 'ng-mocks';
import { SubmissionsService } from '../../submissions.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { routes } from '../../app-routing.module';
import { Location } from '@angular/common';
import { AdminComponent } from '../admin.component';

describe('SubmissionsListComponent', () => {
  let submissionsService: SubmissionsService;
  let router: RouterTestingHarness;
  let location: Location
  const submissionData = {_id: '123id', projectName: '123id', name: 'Owen Wilson', email: "Wow@wow.com", projectDescription: 'a new project'}

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [AdminComponent, SubmissionsListComponent],
      providers: [MockProvider(SubmissionsService)],
      imports: [RouterTestingModule.withRoutes(routes)]
    });

    submissionsService = TestBed.inject(SubmissionsService)

    location = TestBed.inject(Location)
    spyOn(submissionsService, 'getAllSubmissions').and.returnValue(of([submissionData]))

    router = await RouterTestingHarness.create(); // [1]
    const component = await router.navigateByUrl(
      '/admin'
    );
    router.detectChanges();
  });


  it('should display the submissions on the screen', () => {

    expect(router.routeNativeElement?.textContent?.includes(submissionData.email)).toBe(true)
    expect(router.routeNativeElement?.textContent?.includes(submissionData.name)).toBe(true)
    expect(router.routeNativeElement?.textContent?.includes(submissionData.projectName)).toBe(true)
  })

  it('should route to submission review, when item clicked', fakeAsync( () => {
    router.detectChanges()
    const debugElements = router.routeDebugElement?.query(By.css('div'));
    debugElements?.nativeElement.click()
    tick()
    router.detectChanges()
    expect(location.path()).toBe('/admin/submission/123id')
  }))
});
