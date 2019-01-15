import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MptComponent } from "./meal/mpt.component";
import { MainNavComponent } from "./main-nav/main-nav.component";
import { LayoutModule } from "@angular/cdk/layout";
import {
  MatToolbarModule,
  MatGridListModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatButtonToggleModule,
  MatRadioModule,
  MatMenuModule
} from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDialogModule } from "@angular/material/dialog";
import { MealDialogComponent } from "./meal/create-mpt-dialog/meal-dialog.component";
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireAuthModule } from "angularfire2/auth";
import { environment } from "../environments/environment";
import { MptItemComponent } from "./meal/mpt-item/mpt-item.component";
import { CreateFoodDialogComponent } from "./meal/mpt-item/create-food-dialog/create-food-dialog.component";
// import { FlexLayoutModule } from '@angular/flex-layout';
// FlexLayoutModule,
import { FrontpageComponent } from "./frontpage/frontpage.component";
import { CreateMealDialogComponent } from "./meal/mpt-item/create-meal-dialog/create-meal-dialog.component";
import { TptComponent } from "./exercise/tpt.component";
import { TptItemComponent } from "./exercise/tpt-item/tpt-item.component";
import { CreateTptDialogComponent } from "./exercise/create-tpt-dialog/create-tpt-dialog.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MptService } from "./meal/mpt.service";
import { AuthService } from "./auth/auth.service";
import { FoodItemComponent } from "./meal/mpt-item/food-item/food-item.component";
import { EditFoodDialogComponent } from "./meal/mpt-item/food-item/edit-food-dialog/edit-food-dialog.component";
import {
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatTabsModule,
  MatCardModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatAutocompleteModule
} from "@angular/material";

@NgModule({
  declarations: [
    AppComponent,
    MptComponent,
    MainNavComponent,
    MealDialogComponent,
    MptItemComponent,
    CreateFoodDialogComponent,
    CreateMealDialogComponent,
    FrontpageComponent,
    TptComponent,
    TptItemComponent,
    CreateTptDialogComponent,
    FoodItemComponent,
    EditFoodDialogComponent
  ],
  imports: [
    BrowserModule,
    DragDropModule,
    AppRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatAutocompleteModule,
    MatIconModule,
    MatListModule,
    BrowserAnimationsModule,
    MatDialogModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonToggleModule,
    MatRadioModule,
    MatMenuModule,
    FormsModule
  ],
  entryComponents: [
    MealDialogComponent,
    CreateFoodDialogComponent,
    CreateMealDialogComponent,
    CreateTptDialogComponent,
    EditFoodDialogComponent
  ],
  providers: [MptService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
