import { email, minLength, required, schema } from '@angular/forms/signals';

export interface IUser {
  userId: number;
  userName: string;
  emailId: string;
  fullName: string;
  role: string;
  createdDate: string;
  password: string;
  projectName: string;
  refreshToken: any;
  refreshTokenExpiryTime: any;
}

export interface IRegister {
  userId: number;
  userName: string;
  emailId: string;
  fullName: string;
  password: string;
}

export const InitialRegister: IRegister = {
  userId: 0,
  userName: '',
  emailId: '',
  fullName: '',
  password: '',
};

export const RegisterSchema = schema<IRegister>((root) => {
  (required(root.userName, { message: 'This field is required' }),
    required(root.emailId, { message: 'This field is required' }),
    email(root.emailId, { message: 'Valid e-mail is required' }),
    required(root.fullName, { message: 'This field is required' }),
    required(root.password, { message: 'This field is required' }),
    minLength(root.password, 6, { message: 'Password should be at least 6 character' }));
});

export interface ILogin {
  userName: string;
  password: string;
}

export const InitialLogin: ILogin = {
  userName: '',
  password: '',
};

export const LoginSchema = schema<ILogin>((root) => {
  (required(root.userName, { message: 'Username is required' }),
    required(root.password, { message: 'Password is required' }));
});

export interface ILoanApplicationResponse {
  applicantID: number;
  dateApplied: string;
  applicationStatus: string;
  fullName: string;
  email: string;
  employmentStatus: string;
  customerPhone: string;
  assignedToBankEmployee: string;
  panCard: string;
}

export interface IIloanByEmpIdResponse {
  applicantID: number;
  dateApplied: string;
  applicationStatus: string;
  fullName: string;
  email: string;
  employmentStatus: string;
  customerPhone: string;
  panCard: string;
}

export interface IloanByIdResponse {
  applicantID: number;
  dateApplied: string;
  applicationStatus: string;
  employmentStatus: string;
  assignedToBankEmployee: string;
  panCard: string;
}

export const initialLoanAppRes: ILoanApplicationResponse = {
  applicantID: 0,
  dateApplied: '',
  applicationStatus: '',
  fullName: '',
  email: '',
  employmentStatus: '',
  customerPhone: '',
  assignedToBankEmployee: '',
  panCard: '',
};

export const LoanAppResSchema = schema<ILoanApplicationResponse>((root) => {});

export interface ILoanApplication {
  applicantID: number;
  fullName: string;
  applicationStatus: string;
  panCard: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  annualIncome: number;
  employmentStatus: string;
  creditScore: number;
  assets: string;
  dateApplied: string;
  Loans: Loan[];
  customerId: number;
}

export const InitialApplication: ILoanApplication = {
  applicantID: 0,
  fullName: '',
  applicationStatus: '',
  panCard: '',
  dateOfBirth: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  annualIncome: 0,
  employmentStatus: '',
  creditScore: 0,
  assets: '',
  dateApplied: new Date().toISOString(),
  Loans: [
    {
      loanID: 0,
      applicantID: 0,
      bankName: '',
      loanAmount: 0,
      emi: 0,
    },
  ],
  customerId: 0,
};
export interface Loan {
  loanID: number;
  applicantID: number;
  bankName: string;
  loanAmount: number;
  emi: number;
}

export const InitialLoan: Loan = {
  loanID: 0,
  applicantID: 0,
  bankName: '',
  loanAmount: 0,
  emi: 0,
};

export const LoanSchema = schema<Loan>((root) => {});

export const LoanApplicationSchema = schema<ILoanApplication>((root) => {});
