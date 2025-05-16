import { DataSource } from 'typeorm';
import { User } from '../users/dto/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',

  host: process.env.DB_HOST || 'db.supabase.co',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'supabase_user',
  password: process.env.DB_PASSWORD || 'supabase_password',
  database: process.env.DB_DATABASE || 'supabase_db',
  entities: [User],
  synchronize: true, // Lembrar de trocar para migration
  logging: false,
  
  // Se quiser usar Postgres local, comente o acima e descomente:
  // host: 'localhost',
  // port: 5432,
  // username: 'postgres',
  // password: 'postgres',
  // database: 'conectar_db',
});