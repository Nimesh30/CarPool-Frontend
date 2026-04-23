export interface UserDTO {
     email: string;
  username: string;
  phone: string;
  password: string;
  role: 'USER' | 'DRIVER';
}
