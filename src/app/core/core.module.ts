import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminGuardService } from './services/admin-guard.service';
import { AuthGuardService } from './services/auth-guard.service';
import { NotificationService } from './services/notification.service';
import { UserGuardService } from './services/user-guard.service';

@NgModule({
  declarations: [],
  providers: [
    AuthGuardService,
    AdminGuardService,
    UserGuardService,
    NotificationService,
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
