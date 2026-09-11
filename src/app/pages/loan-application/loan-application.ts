import { ApplicationService } from './../../services/application-service';
import { IUser, Loan } from './../../models/MasterModels';
import { Component, inject, signal } from '@angular/core';
import {
  ILoanApplication,
  InitialApplication,
  LoanApplicationSchema,
} from '../../models/MasterModels';
import { form, FormField } from '@angular/forms/signals';
import { LoanResponse } from '../application-list/application-list';
import { Router } from '@angular/router';

@Component({
  imports: [FormField],
  selector: 'app-loan-application',
  styleUrl: './loan-application.css',
  templateUrl: './loan-application.html',
})
export class LoanApplication {
  applicationService = inject(ApplicationService);

  applicationModel = signal<ILoanApplication>(InitialApplication);

  applicationForm = form(this.applicationModel, LoanApplicationSchema);
  route = inject(Router);

  constructor() {
    const storage = localStorage.getItem('user');
    const parse: IUser = storage ? JSON.parse(storage) : null;
    const currentUserId = parse.userId ?? 0;

    this.applicationModel.update((prev) => ({
      ...prev,
      customerId: currentUserId,
    }));
  }

  onSubmit() {
    if (this.applicationForm().valid()) {
      const value = this.applicationForm().value();
      this.applicationService.loanSubmit(value).subscribe({
        next: (res: LoanResponse) => {
          alert(res.message);
          this.route.navigateByUrl('application-list');
        },
        error: (err) => {
          alert(err.error.message);
        },
      });
    }
  }
  addLoan() {
    this.applicationModel.update((prevLoan) => ({
      ...prevLoan,
      Loans: [
        ...prevLoan.Loans,
        { loanID: 0, applicantID: prevLoan.applicantID, bankName: '', loanAmount: 0, emi: 0 },
      ],
    }));
  }

  removeLoan(index: number) {
    this.applicationModel.update((prev) => ({
      ...prev,
      Loan: prev.Loans.filter((_, i) => i !== index),
    }));
  }
}
