import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'revenuePerFilter'
})
@Injectable()
export class RevenuePerFilterPipe implements PipeTransform {
    transform(items: any[], tregSearch: string, witelSearch: string, nameSearch: string, ketSearch: string){
        if (items && items.length) {
            return items.filter(item => {
                if (tregSearch && item.TREG.toLowerCase().indexOf(tregSearch.toLowerCase()) === -1){
                    return false;
                }
                if (witelSearch && item.WITEL_NAME.toLowerCase().indexOf(witelSearch.toLowerCase()) === -1){
                    return false;
                }
                if (nameSearch && item.NAME.toLowerCase().indexOf(nameSearch.toLowerCase()) === -1){
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