/* import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription, Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mpt } from './mpt.model';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  mptChanged = new Subject<Mpt>();
  mptsChanged = new Subject<Mpt[]>();
  mpts: Mpt[] = [];
  private mptSubs: Subscription[] = [];

  constructor(private db: AngularFirestore) {

  }
  addMptToFirestore(mpt: Mpt) {
    this.db.collection('MealPlanTemplates').add(mpt);
  }
  fetchMpts() {
    this.mptSubs.push(this.db
      .collection('MealPlanTemplates')
      .snapshotChanges()
      .pipe(map(docArray => {
        return docArray.map(doc => {
          return {
            comment: doc.payload.doc.data().comment,
            title: doc.payload.doc.data().title,
            id: doc.payload.doc.id
          };
        });
      }))
      .subscribe((mptsArray: Mpt[]) => {
        this.mpts = mptsArray;
        console.log(this.mpts);
        this.mptsChanged.next([...this.mpts]);
      }));
  }
}
 */
