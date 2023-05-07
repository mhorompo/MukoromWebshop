import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(value: number, currencyCode: string = 'HUF'): string {
    const formatter = new Intl.NumberFormat('hu-HU', {
      style: 'currency',
      currency: currencyCode,
      currencyDisplay: 'symbol'
    });

    return formatter.format(value);
  }

}
