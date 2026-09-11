import { Component, computed, DestroyRef, effect, inject, signal } from '@angular/core';
import {
  ApplicationService,
  IEmpResponse,
  IResponse,
  IResponseById,
} from '../../services/application-service';
import {
  IIloanByEmpIdResponse,
  ILoanApplication,
  ILoanApplicationResponse,
  IloanByIdResponse,
  IUser,
} from '../../models/MasterModels';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LOCAL_STORAGE_KEY } from '../../constants/global-const';
import { readLocalStorage } from '../../helpers/local-storage-helper';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface LoanResponse {
  message: string;
  result: true;
  data: ILoanApplicationResponse[];
}

@Component({
  imports: [UpperCasePipe, DatePipe, RouterLink, FormsModule],
  selector: 'app-application-list',
  styleUrl: './application-list.css',
  templateUrl: './application-list.html',
})
export class ApplicationList {
  protected applicationService = inject(ApplicationService);
  protected searchTerm = signal<string>('');
  protected loggedUser = signal<IUser | null>(null);
  protected loanById = signal<IloanByIdResponse[]>([]);
  protected loanByEmpId = signal<IIloanByEmpIdResponse[]>([]);
  private destroyRef = inject(DestroyRef);

  protected data = computed(() => {
    return this.applicationService.getLoanList.value()?.data ?? [];
  });

  protected search = computed(() => {
    const query = this.searchTerm()?.trim().toLowerCase() || '';
    const applications = this.applicationService.getLoanList.value()?.data || [];

    // If search query is empty, return all records
    if (!query) {
      return applications;
    }
    // Filter case-insensitively by full name (or email/phone as needed)
    return applications.filter((app) => app.fullName?.toLowerCase().includes(query));
  });

  acceptApplication(pan: string, status: string) {
    this.applicationService
      .changeStatus(pan, status)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          alert(res.message);
          this.loanByEmpId();
        },
      });
  }
  rejectApplication(pan: string, status: string) {
    this.applicationService
      .changeStatus(pan, status)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          alert(res.message);
          this.loanByEmpId();
        },
      });
  }

  ngOnInit() {
    const user = readLocalStorage(LOCAL_STORAGE_KEY.USER);
    this.loggedUser.set(user);
    this.applicationService
      .getLoanById(user.userId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: IResponseById) => {
          this.loanById.set(res.data);
        },
      });

    this.applicationService
      .getLoanByEmp(user.userId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: IEmpResponse) => {
          this.loanByEmpId.set(res.data);
        },
      });
  }
}
