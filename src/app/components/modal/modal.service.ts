import { ComponentType } from "@angular/cdk/portal";
import { inject, Injectable } from "@angular/core";
import { MatDialog} from '@angular/material/dialog'
import { Contact } from "@features/contacts/contactinterfaces";


@Injectable({providedIn: 'root'})
    export class ServiceNameService{
        private readonly _dialog = inject(MatDialog);

        constructor(){}




        openModal<CT, T = Contact>(componentRef: ComponentType<CT>, data?: T, 
            isEditing = false){
                const config = {data, isEditing};

                this._dialog.open(componentRef, {
                    data: config,
                    width: '600px'
                });

        }


        closeModal(){
            this._dialog.closeAll();
        }

    }
