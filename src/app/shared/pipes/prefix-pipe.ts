import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prefix',
})
export class PrefixPipe implements PipeTransform {

  transform(name: string, gender: string): string {
    return gender === 'male' ? `Mr. ${name}` : `Ms. ${name}`;
  }

}
