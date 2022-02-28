import {
  Length,
  IsNotEmpty
} from 'class-validator';
export class RegisterBody{
  @Length(1,50,{
    message:'用户名不能为空或者大于50个字符'
  })
  name:string;
  @IsNotEmpty({
    message:'密码不能为空'
  })
  password:string;
  
  // 需要自定义装饰器处理
  // rePassword:string;
}