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

  getLocalStorage(key: string) {
    const local = localStorage.getItem(key);
    if (local != null) {
      return JSON.parse(local);
    }
  }
  setLocalStorage(key: string, value: object) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  removeLocalStorage(key: string) {
    localStorage.removeItem(key);
  }
  clearLocalStorage() {
    localStorage.clear();
  }

  getUserList = httpResource<Response>(
    () => 'https://projectapi.gerasim.in/api/BankLoan/GetAllUsers',
  );

  getLoanList = httpResource<LoanResponse>(
    () => 'https://projectapi.gerasim.in/api/BankLoan/GetAllApplications',
  );

  getLoanById(userId: number): Observable<IResponseById> {
    return this.http.get<IResponseById>(
      `https://projectapi.gerasim.in/api/BankLoan/GetMyApplications?customerId=${userId}`,
    );
  }

  getLoanByEmp(empId: number): Observable<IEmpResponse> {
    return this.http.get<IEmpResponse>(
      `https://projectapi.gerasim.in/api/BankLoan/GetApplicationAssigneedToMe?bankEmployeeId=${empId}`,
    );
  }

  changeStatus(panNo: string, status: string) {
    return this.http.get<IResponse>(
      `https://projectapi.gerasim.in/api/BankLoan/CheckApplicationStatus?panNo=${panNo}&status=${status}`,
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

  pending = computed(() => {
    return this.activeLoans() - (this.underReview() + this.approved() + this.rejected());
  });

  loanSubmit(obj: ILoanApplication): Observable<LoanResponse> {
    return this.http.post<LoanResponse>(
      'https://projectapi.gerasim.in/api/BankLoan/AddNewApplication',
      obj,
    );
  }

  loginSubject$: Subject<void> = new Subject<void>();
}
