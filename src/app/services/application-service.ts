import { HttpClient, HttpErrorResponse, httpResource } from '@angular/common/http';
import { computed, inject, Service } from '@angular/core';
import {
  IIloanByEmpIdResponse,
  ILoanApplication,
  ILoanApplicationResponse,
  IloanByIdResponse,
  IUser,
} from '../models/MasterModels';
import { Response } from './register-service';
import { Observable, Subject } from 'rxjs';
import { LoanResponse } from '../pages/application-list/application-list';
import { API_EndPoints, API_URL } from '../constants/global-const';

export interface IEmpResponse {
  message: string;
  result: boolean;
  data: IIloanByEmpIdResponse[];
}

export interface IResponse {
  message: string;
  result: boolean;
  data: ILoanApplicationResponse;
}

export interface IResponseById {
  message: string;
  result: boolean;
  data: IloanByIdResponse[];
}
@Service()
export class ApplicationService {
  private http = inject(HttpClient);

  getUserList = httpResource<Response>(() => `${API_URL.BASE_URL}${API_EndPoints.GET_USERS}`);

  getLoanList = httpResource<LoanResponse>(() => `${API_URL.BASE_URL}${API_EndPoints.GET_APP}`);

  getLoanById(userId: number): Observable<IResponseById> {
    return this.http.get<IResponseById>(
      `${API_URL.BASE_URL}${API_EndPoints.GET_APP_BY_CUSTID}${userId}`,
    );
  }

  getLoanByEmp(empId: number): Observable<IEmpResponse> {
    return this.http.get<IEmpResponse>(
      `${API_URL.BASE_URL}/GetApplicationAssigneedToMe?bankEmployeeId=${empId}`,
    );
  }

  changeStatus(panNo: string, status: string) {
    return this.http.get<IResponse>(
      `${API_URL.BASE_URL}/CheckApplicationStatus?panNo=${panNo}&status=${status}`,
    );
  }

  activeLoans = computed(() => {
    return Number(this.getLoanList.value()?.data.length);
  });
  underReview = computed(() => {
    return Number(
      this.getLoanList.value()?.data.filter((item) => item.applicationStatus === 'Pending').length,
    );
  });
  approved = computed(() => {
    return Number(
      this.getLoanList.value()?.data.filter((item) => item.applicationStatus === 'Approved').length,
    );
  });
  rejected = computed(() => {
    return Number(
      this.getLoanList.value()?.data.filter((item) => item.applicationStatus === 'Reject').length,
    );
  });

  newLoan = computed(() => {
    return Number(
      this.getLoanList.value()?.data.filter((item) => item.applicationStatus === 'New').length,
    );
  });

  pending = computed(() => {
    return this.activeLoans() - (this.underReview() + this.approved() + this.rejected());
  });


  loanSubmit(obj: ILoanApplication): Observable<LoanResponse> {
    return this.http.post<LoanResponse>(`${API_URL.BASE_URL}${API_EndPoints.POST_APP}`, obj);
  }

  loginSubject$: Subject<void> = new Subject<void>();
}
