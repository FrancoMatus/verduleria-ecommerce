export interface UserInterface {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  isAdmin: boolean;
  update(body: object, conditionals: object): Promise<any>;
  encryptPassword(password: string): Promise<string>;
  validatePassword(password: string): Promise<boolean>;
}
