import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments
} from 'class-validator';


export function IsSameValue(property:string,ValidationOptions ?: ValidationOptions){
  return function(
    target:Object,
    propertyName:string
  ){
    registerDecorator({
      name:'IsSameValue',
      target:target.constructor,
      propertyName,
      constraints:[property],
      options:ValidationOptions,
      validator:{
        validate(value:any,validationArguments ?: ValidationArguments):Promise<boolean> | boolean {
          // 第一个参数的值
          const relatedValue = validationArguments && (validationArguments.object as any)[property];

          return relatedValue === value;
        }
      }
    })
  }

}