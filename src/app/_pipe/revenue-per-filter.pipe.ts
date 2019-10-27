import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'revenuePerFilter'
})
@Injectable()
export class RevenuePerFilterPipe implements PipeTransform {
    transform(items: any[], tregSearch: string, witelSearch: string, amSearch: string, customerSearch: string, ketSearch: string){
        if (items && items.length) {
            return items.filter(item => {
                if (tregSearch && item.TREG.toLowerCase().indexOf(tregSearch.toLowerCase()) === -1){
                    return false;
                }
                if (witelSearch && item.WITEL_ID.toLowerCase().indexOf(witelSearch.toLowerCase()) === -1){
                    return false;
                }
                if (amSearch && item.AM_ID.indexOf(amSearch) === -1){
                    return false;
                }
                if (customerSearch && item.CUSTOMER_ID.indexOf(customerSearch) === -1){
                    return false;
                }
                if (ketSearch && item.KET.toLowerCase().indexOf(ketSearch.toLowerCase()) === -1){
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