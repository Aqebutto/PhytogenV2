import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "angularfire2/firestore";
import { Subscription, Subject, Observable, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { Tpt } from "./tpt";

@Injectable({
  providedIn: "root"
})
export class TptService {
  tptsChanged = new Subject<Tpt[]>();
  tpts: Tpt[] = [];
  private tptSubs: Subscription[] = [];
  tptCol: AngularFirestoreCollection<Tpt>;

  constructor(private db: AngularFirestore) {}
  addTptToFirestore(tpt: Tpt) {
    this.db.collection("TrainingPlanTemplates").add(tpt);
  }
  fetchtpts() {
    this.tptCol = this.db.collection("TrainingPlanTemplates");
    this.tptSubs.push(
      this.tptCol
        .snapshotChanges()
        .pipe(
          map(docArray => {
            return docArray.map(doc => {
              return {
                id: doc.payload.doc.id,
                title: doc.payload.doc.data().title,
                comment: doc.payload.doc.data().comment
              };
            });
          })
        )
        .subscribe((tptsArray: Tpt[]) => {
          this.tpts = tptsArray;
          // console.log('tpt: ' , this.tpts);
          this.tptsChanged.next([...this.tpts]);
        })
    );
  }
}
