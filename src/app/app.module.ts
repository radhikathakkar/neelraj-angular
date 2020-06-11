import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './services/user.service';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { MemberComponent } from './member/member.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ContactComponent } from './contact/contact.component';
import { BottomHeaderComponent } from './bottom-header/bottom-header.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './modules/material/material.module';
import { RegisterComponent } from './register/register.component';
import { JwtInterceptor } from '@auth0/angular-jwt';
import { AuthGuard } from './guards/auth.guard';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { EditProfileComponent } from './my-profile/edit-profile/edit-profile.component';
import { DeleteProfileComponent } from './my-profile/delete-profile/delete-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    MemberComponent,
    UserProfileComponent,
    ContactComponent,
    BottomHeaderComponent,
    LoginComponent,
    RegisterComponent,
    MyProfileComponent,
    EditProfileComponent,
    DeleteProfileComponent
  ],
  entryComponents: [
    LoginComponent,
    DeleteProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    NgbModule,
  ],
  providers: [
    UserService,
    AuthGuard,
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
