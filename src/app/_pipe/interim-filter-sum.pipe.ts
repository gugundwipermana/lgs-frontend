import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'interimFilterSum'
})
@Injectable()
export class InterimFilterSumPipe implements PipeTransform {
    transform(items: any[], tregSearch: string, witelSearch: string, customerSearch: string, attr: string): number {
        var sum = 0;
        var jum = 0;
        
        if (items && items.length) {

            var hasil = false;

            items.filter(item => {
                
                hasil = true;

                if (tregSearch && item.TREG.toLowerCase().indexOf(tregSearch.toLowerCase()) === -1){
                    hasil = false;
                }
                if (witelSearch && item.WITEL_NAME.toLowerCase().indexOf(witelSearch.toLowerCase()) === -1){
                    hasil = false;
                }
                if (customerSearch && item.CUSTOMER_NAME.toLowerCase().indexOf(customerSearch.toLowerCase()) === -1){
                    hasil = false;
                }

                if (hasil == true) {
                    sum += Number(item[attr]);
                    jum++;
                }
            })

        }

        return sum / jum;

    }
}