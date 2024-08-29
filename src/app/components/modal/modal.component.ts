import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ServiceNameService } from './modal.service';
import { ContactService } from '@features/contacts/contact.service';
import { APP_CONSTANTS } from '@shared/constants';
import { MatButtonModule } from '@angular/material/button';
import { SnackBarService } from '@shared/services/snack-bar.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    MatLabel,
    MatFormField,
    MatInput,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './modal.component.html' 
  ,
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit {



  contactForm!: FormGroup;

  private readonly _fb = inject(FormBuilder);
  private readonly _matDialog = inject(MAT_DIALOG_DATA);
  private readonly _contactSv = inject(ContactService);
  private readonly _modalSvc = inject(ServiceNameService);
  private readonly _snackBar = inject(SnackBarService);

    
  ngOnInit(): void {
    this._buildForm();
    this.contactForm.patchValue(this._matDialog.data);

  }


  async onSubmit(){
    let message = APP_CONSTANTS.MESSAGES.CONTACT_UPDATED;
    const contact = this.contactForm.value;

    if(this._matDialog.data){
      this._contactSv.updateContact(
        this._matDialog.data.id,
        contact
      );
    } else {
      await this._contactSv.newContact(contact);
      message = APP_CONSTANTS.MESSAGES.CONTACT_ADDED;
    }

    //show snackbar

    this._snackBar.showSnackBar(message);

    this._modalSvc.closeModal();

  }

 

  private _buildForm(): void {
    this.contactForm = this._fb.nonNullable.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  getTitle():string{
    return this._matDialog.data ? 'Edit Contact' : 'Add Contact';
  }



}
