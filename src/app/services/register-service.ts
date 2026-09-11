import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { IRegister, IUser } from '../models/MasterModels';
import { Observable } from 'rxjs';
import { API_EndPoints, API_URL } from '../constants/global-const';

export interface Response{
  message: string,
  result: true,
  data: IUser[]
}

export interface IRegisterResponse{
  message: string,
  result: true,
  data: IRegister[]
}

@Service()
export class RegisterService {
  private http = inject(HttpClient);

  register(obj: IRegister):Observable<IRegisterResponse> {
    return this.http.post<IRegisterResponse>(API_URL.BASE_URL+API_EndPoints.REGISTER_USER,obj,
    );
  }

}
