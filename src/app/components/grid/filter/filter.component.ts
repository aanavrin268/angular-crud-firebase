import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [MatLabel,
    MatFormField,
    MatInput,
    FormsModule
  ],
  template: `
   <mat-form-field>
        <mat-label>{{ label() }}</mat-label>
        <input matInput type="text"
        [(ngModel)] ="filter"
        [placeholder]="placeholder()">
    </mat-form-field>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent {
  filter = model('');
  label = input<string>('Filter');
  placeholder = input<string>('Ex. name');

}
