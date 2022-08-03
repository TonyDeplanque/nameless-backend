export interface User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  city: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserViewModel {
  firstname: string;
  lastname: string;
  email: string;
  city: string;
}
