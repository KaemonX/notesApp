import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.page').then(m => m.HomePage)
  },
  {
    path: 'note',
    loadComponent: () =>
      import('./pages/note/note.page').then(m => m.NotePage)
  },
  {
    path: 'note/:id',
    loadComponent: () =>
      import('./pages/note/note.page').then(m => m.NotePage)
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
