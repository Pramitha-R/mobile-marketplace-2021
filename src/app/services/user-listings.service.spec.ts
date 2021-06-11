import { TestBed } from '@angular/core/testing';

import { UserListingsService } from './user-listings.service';

describe('UserListingsService', () => {
  let service: UserListingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserListingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
