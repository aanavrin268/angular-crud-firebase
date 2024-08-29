import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MatCardModule } from '@angular/material/card';
import { ServiceNameService } from '@components/modal/modal.service';
import { ModalComponent } from '@components/modal/modal.component';
import { Contact } from '@features/contacts/contactinterfaces';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner'

const MATERIAL_MODULES = [MatCardModule, MatProgressSpinnerModule];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToolbarComponent, ...MATERIAL_MODULES],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent {
  private readonly _modalSvc = inject(ServiceNameService);




  onClickNewContact(): void {
    console.log('Nuevo contacto');
    this._modalSvc.openModal<ModalComponent>(ModalComponent);
  }
}
