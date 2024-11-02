import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
  ],
  providers: [
    AuthService,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
})
export class AuthModule { }
