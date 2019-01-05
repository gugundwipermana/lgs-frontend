import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousandSuff'
})
export class ThousandSuffixesPipe implements PipeTransform {
  transform(input: any, args?: any): any {

    var exp, rounded, value, positif = 1;
//  var suffixes = ['R', 'J', 'M', 'T', 'K', 'Kui'];
//
    if (Number.isNaN(input)) {
      return null;
    }

    if (input < 1000 && input >= 0) {
      return input;
    }


    if(input < 0) {
      input = Math.abs(input);
      positif = 0;
    }

//    exp = Math.floor(Math.log(input) / Math.log(1000));     // get index
//
//    value = (input / Math.pow(1000, exp)).toFixed(2) /*.toFixed(args) -- remove all comma */ + suffixes[exp - 1];
//
    

    value = (input / 1000000000).toFixed(2);

    if(positif == 0) {
      return "- "+value;
    }
    
    // return (Number(value)) + 'M';

    return new Intl.NumberFormat('id', {
      minimumFractionDigits: 2
    }).format(Number(value)) + 'M';

    // return value;
  }
}