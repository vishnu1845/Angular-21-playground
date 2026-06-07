import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prefix',
})
export class PrefixPipe implements PipeTransform {

  transform(name: unknown, gender: unknown): string {
    // let userName = name.toUpperCase(); // error
    return gender === 'male' ? `Mr. ${name}` : `Ms. ${name}`;
  }


  // transform(name: unknown, gender: unknown): string {
  //   if (typeof name !== 'string' || typeof gender !== 'string') {
  //     return String(name); // fallback — can't crash
  //   }
  //   return gender === 'male' ? `Mr. ${name}` : `Ms. ${name}`;
  // }
}
