import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from './editor/editor.component';
import { SumaryComponent } from './sumary/sumary.component';


const routes: Routes = [{
  path:'editor',
  component: EditorComponent
},
{
  path:'sumary',
  component: SumaryComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
