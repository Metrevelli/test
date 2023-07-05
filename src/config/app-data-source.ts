import { DataSource } from 'typeorm';
import { PostEntity } from '../entities/post.entity';

export const dataSource = new DataSource({
  name: 'default',
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'test',
  entities: [PostEntity],
  logging: true,
  synchronize: true,
  charset: 'utf8mb4'
});

export default dataSource;
