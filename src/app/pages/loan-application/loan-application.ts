import { ApplicationService } from './../../services/application-service';
import { IUser, Loan } from './../../models/MasterModels';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import {
  ILoanApplication,
  InitialApplication,
  LoanApplicationSchema,
} from '../../models/MasterModels';
import { form, FormField } from '@angular/forms/signals';
import { LoanResponse } from '../application-list/application-list';
import { Router } from '@angular/router';
import { readLocalStorage } from '../../helpers/local-storage-helper';
import { LOCAL_STORAGE_KEY } from '../../constants/global-const';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  imports: [FormField],
  selector: 'app-loan-application',
  styleUrl: './loan-application.css',
  templateUrl: './loan-application.html',
})
export class LoanApplication {
  applicationService = inject(ApplicationService);
  destroyRef = inject(DestroyRef)
  applicationModel = signal<ILoanApplication>(InitialApplication);

  applicationForm = form(this.applicationModel, LoanApplicationSchema);
  route = inject(Router);

  constructor() {
    const parse: IUser = readLocalStorage(LOCAL_STORAGE_KEY.USER);
    const currentUserId = parse.userId ?? 0;

    this.applicationModel.update((prev) => ({
      ...prev,
      customerId: currentUserId,
    }));
  }

  onSubmit() {
    if (this.applicationForm().valid()) {
      const value = this.applicationForm().value();
      this.applicationService.loanSubmit(value).pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe({
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
