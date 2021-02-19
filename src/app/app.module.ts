import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormyModule } from '../../projects/formy/src/public_api';
import { FormsModule } from '@angular/forms';
import { EditorComponent } from './editor/editor.component';
import { SumaryComponent } from './sumary/sumary.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    SumaryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    FormyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
