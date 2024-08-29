import { Component, effect, inject, input, OnInit, signal, viewChild } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInput } from '@angular/material/input'
import { FilterComponent } from "./filter/filter.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { APP_CONSTANTS } from '@shared/constants';
import { ContactService } from '@features/contacts/contact.service';
import { ServiceNameService } from '@components/modal/modal.service';
import { ModalComponent } from '@components/modal/modal.component';
import { SnackBarService } from '@shared/services/snack-bar.service';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [MatTableModule,
    MatSortModule,
    MatPaginator,
    MatLabel,
    MatFormField,
    MatInput, FilterComponent,
    MatButtonModule,
    MatIconModule
    ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent<T> implements OnInit {
 
  displayedColumns = input.required<string[]>();
  data = input.required<T[]>();
  valueToFilter = signal('');
  sortableColumns = input<string[]>([]);

  dataSource = new MatTableDataSource<T>();
  private readonly _sort = viewChild.required<MatSort>(MatSort);
  private readonly _paginator = viewChild.required<MatPaginator>(MatPaginator);
  private readonly _contactSvc = inject(ContactService);
  private readonly _modalSvc = inject(ServiceNameService);
  private readonly _snackBar = inject(SnackBarService);

  constructor(){
    effect(() => {
      if (this.valueToFilter()){
        this.dataSource.filter = this.valueToFilter();
      }else {
        this.dataSource.filter = '';
      }

      if(this.data()){
        this.dataSource.data = this.data();
      }





    }, {allowSignalWrites: true});
  }

  ngOnInit(): void {
    this.dataSource.data = this.data();
    this.dataSource.sort = this._sort();
    this.dataSource.paginator = this._paginator();
  }


  openEditForm(data: T):void{
    this._modalSvc.openModal<ModalComponent, T>(ModalComponent, data, true);
  }

  deleteContact(id: string):void{
    const confirmation = confirm(
    );

    if(confirmation){
      this._contactSvc.deleteContact(id);
      this._snackBar.showSnackBar(APP_CONSTANTS.MESSAGES.CONFIRMATION_PROMPT
      );
    }
  }



  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  

}
