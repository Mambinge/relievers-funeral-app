export interface Accounts {
    title: Title;
    name: string;
    surname: string;
    gender: Gender;
    nationality: Nationality;
    idNumber: string;
    dateOfBirth: string;
    sourceOfIncome: string;
    plan: Plan;
    bankDetails: BankDetails;
    contactDetails: ContactDetails;
  }
  
  export interface ContactDetails {
    phone: string;
    email: string;
    address: string;
  }
  
  export interface BankDetails {
    bank: string;
    branch: string;
    accountName: string;
    accountNumber: string;
  }
  
  export interface Plan {
    id: number;
    name: string;
  }

  export enum Gender {
    MALE="MALE",
    FEMALE="FEMALE"
  }

  export enum Nationality {
    Afghan="Afghan",
    Albanian="Albanian",
    Algerian="Algerian", 
    American="American", 
    Andorran="Andorran", 
    Angolan="Angolan", 
  }

  export enum Title {
    Mr="Mr", 
    Mrs="Mrs", 
    Miss="Miss", 
    Dr="Dr", 
    Prof="Prof" 
  }