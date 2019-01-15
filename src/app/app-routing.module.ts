import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MptComponent } from './meal/mpt.component';
import { MptItemComponent } from './meal/mpt-item/mpt-item.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { TptComponent } from './exercise/tpt.component';
import { TptItemComponent } from './exercise/tpt-item/tpt-item.component';
import { EditFoodDialogComponent } from './meal/mpt-item/food-item/edit-food-dialog/edit-food-dialog.component';
import { MainNavComponent } from './main-nav/main-nav.component';
// import {  }


const appRoutes: Routes = [
    { path: 'mpt', component: MptComponent, children: [
      {path: ':id', component: MptItemComponent}
    ] },
    // { path: 'mpt/:id/:id },
    { path: '', component: FrontpageComponent },
    { path: 'tpt', component: TptComponent, children: [
      {path: ':id', component: TptItemComponent}
    ] },
    { path: 'nav', component: MainNavComponent },
    // { path: 'mptItem', component: MptItemComponent }
];


  @NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {

  }
