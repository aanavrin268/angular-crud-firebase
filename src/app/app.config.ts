import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { environment } from 'src/environments/environment.development';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    provideFirebaseApp(() => initializeApp(
      {"projectId":"proyectocrud-b51f4","appId":"1:975822908722:web:c276ebb637bf6d9870fb2b","storageBucket":"proyectocrud-b51f4.appspot.com","apiKey":"AIzaSyCaXk1ciqJ6xxZ9w4kkH_assbnEeHF2KAU","authDomain":"proyectocrud-b51f4.firebaseapp.com","messagingSenderId":"975822908722","measurementId":"G-9JLEFBTQPC"}
    )), provideFirestore(() => getFirestore()), provideAnimationsAsync()]
};
