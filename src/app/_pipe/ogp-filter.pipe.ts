import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ogpFilter'
})
@Injectable()
export class OgpFilterPipe implements PipeTransform {
    transform(items: any[], orderIdSearch: string, sidSearch: string, amSearch: string){
        if (items && items.length) {
            return items.filter(item => {
                if (orderIdSearch && item.ORDER_ID.toLowerCase().indexOf(orderIdSearch.toLowerCase()) === -1){
                    return false;
                }
                if (sidSearch && item.LI_SID.toLowerCase().indexOf(sidSearch.toLowerCase()) === -1){
                    return false;
                }
                if (amSearch && item.AM.toLowerCase().indexOf(amSearch.toLowerCase()) === -1){
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