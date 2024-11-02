import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ArticlesModule } from './articles/articles.module';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { CommentsModule } from './comments/comments.module';
import { CoreModule } from './core/core.module';
import { camelCaseInterceptor } from './interceptors/camel-case.interceptor';
import { loggingInterceptor } from './interceptors/logging.interceptor';
import { authInterceptor } from './interceptors/auth.interceptor';
// Import other components and modules here

@NgModule({
  declarations: [
    AppComponent,
  ],
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor, camelCaseInterceptor]),
    ),
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    // Import other modules here
    SharedModule,
    ArticlesModule,
    AuthModule,
    CommentsModule,
    CoreModule,
    UserModule,
    AdminModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
