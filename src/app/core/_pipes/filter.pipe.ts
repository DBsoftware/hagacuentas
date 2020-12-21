import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

    /**
   * @items = object from array
   * @term = term's search
   */
  transform(items: any, term: any): any {
    if (term === undefined) return items;

    return items.filter((item) => {
      for(let property in item){
        if (item[property] === null){
          continue;
        }
        if(item[property].toString().toLowerCase().includes(term.toLowerCase())){
          return true;
        }
      }
      return false;
    });
  }

}
