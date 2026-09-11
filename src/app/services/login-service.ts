import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { ILogin } from '../models/MasterModels';
import { Response } from './register-service';

@Service()
export class LoginService {
  http = inject(HttpClient);

  login(obj: ILogin) {
    return this.http.post<Response>('https://projectapi.gerasim.in/api/BankLoan/login', obj);
  }
}
