import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./fileoperations/components/home/home.component";
import { ProfileComponent } from "./fileoperations/components/profile/profile.component";
import { UploadfileComponent } from "./fileoperations/components/upload-file/uploadfile.component";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "profile", component: ProfileComponent },
  { path: "upload-file", component: UploadfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
