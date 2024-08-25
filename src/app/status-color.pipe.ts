import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusColor'
})
export class StatusColorPipe implements PipeTransform {
  transform(status: string): string {
    switch (status) {
      case 'Pending': return 'yellow';
      case 'Accept': return 'green';
      case 'Reject': return 'red';
      default: return 'gray';
    }
  }
}
