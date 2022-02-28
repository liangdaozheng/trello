
import {Model, Table} from 'sequelize-typescript';

@Table({
  tableName:'user'
})
export class User extends Model<User> {
  id:number;
  name:string;
  password:string;
  createAt:Date;
  updatedAt:Date;
}