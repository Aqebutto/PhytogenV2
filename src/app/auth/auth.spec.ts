import { AuthService } from './auth.service';
import { Router } from '@angular/router';
// Comment out line 10 and 25 in auth.service to test this.
describe('Service: Auth', () => {
    let service: AuthService;
    beforeEach(() => {
        service = new AuthService();

    });
    afterEach(() => {
        service = null;
        localStorage.removeItem('token');
    });
    it('should return true from isAuthenticated when there is a token', () => {
        service.token = '1234';
        expect(service.isAuthenticated()).toBeTruthy();
    });
});
