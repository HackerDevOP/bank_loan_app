import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { IRegister, IUser } from '../models/MasterModels';
import { Observable } from 'rxjs';

export interface Response{
  message: string,
  result: true,
  data: IUser[]
}

@Service()
export class RegisterService {
  private http = inject(HttpClient);

  register(obj: IRegister):Observable<Response> {
    return this.http.post<Response>(
      'https://projectapi.gerasim.in/api/BankLoan/RegisterCustomer',
      obj,
    );
  }

}
