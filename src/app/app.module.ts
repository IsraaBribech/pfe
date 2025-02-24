import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { ReactiveFormsModule } from '@angular/forms'; // IMPORTER ReactiveFormsModule

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule // AJOUTER ICI
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
