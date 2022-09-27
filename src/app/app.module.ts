import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MatTableModule } from "@angular/material/table";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule  } from '@angular/material/paginator';
import { DialogBoxComponent } from "./fileoperations/components/dialog-box/dialog-box.component";
import { UploadfileComponent } from "./fileoperations/components/upload-file/uploadfile.component";
import { ProfileComponent } from './fileoperations/components/profile/profile.component';
import { HomeComponent } from './fileoperations/components/home/home.component';
import { HttpClientModule } from "@angular/common/http";
import { FileContentComponent } from './fileoperations/components/file-content/file-content.component';  

@NgModule({
  declarations: [AppComponent, DialogBoxComponent, UploadfileComponent, ProfileComponent, HomeComponent, FileContentComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatInputModule,
    MatPaginatorModule, 
    MatSidenavModule,
    MatIconModule,
    MatDividerModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
