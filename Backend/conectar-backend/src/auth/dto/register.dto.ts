import { Role } from '../../common/enums/role.enum';

export class RegisterDto {
  email: string;
  name: string;
  password: string;
  role?: Role; 
}