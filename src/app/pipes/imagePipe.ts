import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageUrl',
})
export class imagePipe implements PipeTransform {
  transform(value: any, ...args): any {
    return `url${value}`;
  }
}
