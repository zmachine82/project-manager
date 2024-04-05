import { TestBed } from '@angular/core/testing';

import { SubmissionsService } from './submissions.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
describe('SubmissionsService', () => {
  let service: SubmissionsService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(SubmissionsService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should send data back to backend when submitting', () => {

    const formData = {name: 'Owen Wilson', email: "Wow@wow.com", projectDescription: 'a new project'}
    service.submit(formData).subscribe()

    const req = httpTestingController.expectOne('http://localhost:3000/submissions');

    // Assert that the request is a GET.
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(formData)
    const result = {_id: "1234", ...formData}
    req.flush(result);
  });
});
