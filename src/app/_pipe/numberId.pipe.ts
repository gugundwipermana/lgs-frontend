import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberId'
})
export class NumberIdPipe implements PipeTransform {
  transform(input: any, args?: any): any {

    if (Number.isNaN(input)) {
      return 0;
    }

    if (input < 1000 && input >= 0) {
      return input;
    }

    return new Intl.NumberFormat('id', {
      minimumFractionDigits: args
    }).format(Number(input));
  }
}