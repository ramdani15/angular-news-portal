
# Angular News Portal

Frontend for the News Portal, built with Angular. Allows users to sign up, log in, and interact with articles and comments.

## Features
- User Authentication (Sign Up, Login, Logout)
- User Authorization (Admin and User)
- Article Management (Create, Edit, Delete, Approve/Reject by Admin, Publish/Unpublish)
- Comment and Reply
- Like/Dislike Articles and Comments

## Requirements
- Node.js (v20 or later)
- NPM (v10 or later)
- Angular CLI

## Related Repositories
- [News Portal Backend](https://github.com/ramdani15/laravel-rest-news-portal): The Laravel backend for managing APIs, authentication, and data persistence for this application.

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/ramdani15/angular-news-portal.git
   cd angular-news-portal
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Copy the `/src/environment.template.ts` file to `/src/environment.ts` and specify the backend API URL:
   ```plaintext 
   export const environment = {
        production: false,
        apiUrl: 'http://localhost:8080/api'
    };
   ```

4. Run the application:
   ```bash
   npm start
   ```
   or
   ```bash
   ng serve
   ```

5. Access the application:
   Open [http://localhost:4200](http://localhost:4200) in your web browser.

## Usage
- **Admin**:
   - Access all articles
   - Create or Edit or Delete articles
   - Approve or Reject articles
   - Publish or Unpublish articles
   - Add Comment or Reply to article
   - Like or Dislike article and comment
- **User**:
   - Access the articles
   - Create or Edit or Delete articles
   - Request approval for the article
   - Publish or Unpublish articles
   - Add Comment or Reply to article
   - Like or Dislike article and comment

## Folder Structure
- `src/app/components`: Contains the UI components
- `src/app/services`: Handles API interactions

## Build
To build the project for production:
```bash
npm build --prod
```
or
```bash
ng build --prod
```
