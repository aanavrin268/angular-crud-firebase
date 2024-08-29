import { Injectable, inject } from "@angular/core";
import { collectionData, Firestore, getDoc } from "@angular/fire/firestore";
import { addDoc, collection, deleteDoc, doc, DocumentData, DocumentReference, orderBy, query, updateDoc } from "@firebase/firestore";
import { APP_CONSTANTS } from "@shared/constants";
import { Contact } from "./contactinterfaces";
import { Observable } from "rxjs";


@Injectable({providedIn: 'root'})
export class ContactService{
    private readonly _firestore = inject(Firestore);
    private readonly _contactCollection = 
        collection(this._firestore, APP_CONSTANTS.COLLECTION_NAME);

    constructor(){}


    newContact(contact: Partial<Contact>): Promise<DocumentReference<DocumentData, DocumentData>> {
        return addDoc(this._contactCollection, {
            created: Date.now(),
            updated: Date.now(),
            ... contact,
        })
    }


    getAllContacts(){
        const queryFn = query(this._contactCollection,
            orderBy('created', 'desc'));
        
        return collectionData(queryFn, {
            idField: 'id'    
        }) as Observable<Contact[]>
    }


    async getContactById(id:string){
       const docRef = this._getDocRef(id);
       const documentData = await getDoc(docRef);

       return documentData.data() as Contact;
    }

    private _getDocRef(id: string){
        return doc(this._firestore, APP_CONSTANTS.COLLECTION_NAME, id);
    }


    updateContact(id: string, contact: Contact){
        const docRef = this._getDocRef(id);
        updateDoc(docRef, {
            ... contact
        });
    }


    deleteContact(id: string){
        const docRef = this._getDocRef(id);
        deleteDoc(docRef);
    }
}