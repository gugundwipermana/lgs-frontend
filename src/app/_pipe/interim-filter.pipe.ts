import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'interimFilter'
})
@Injectable()
export class InterimFilterPipe implements PipeTransform {
    transform(items: any[], tregSearch: string, witelSearch: string, customerSearch: string){
        if (items && items.length) {
            return items.filter(item => {
                if (tregSearch && item.TREG.toLowerCase().indexOf(tregSearch.toLowerCase()) === -1){
                    return false;
                }
                if (witelSearch && item.WITEL_ID.toLowerCase().indexOf(witelSearch.toLowerCase()) === -1){
                    return false;
                }
                if (customerSearch && item.CUSTOMER_ID.toLowerCase().indexOf(customerSearch.toLowerCase()) === -1){
                    return false;
                }
                return true;
           })
        }
        else{
            return items;
        }
    }
}