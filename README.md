# UserUI

## Necessary Things

### Installed

- Install Node
- Install Angular CLI (`npm install -g @angular/cli@latest`)
- Run `npm install`
- Used CDN package of Bootstrap, no need for installation
- Add Angular Material (`ng add @angular/material@18.1.2`)

## Description

### UI Part

- The application includes a login with the following credentials:
**Login**: :admin@gmail.com  
**Password**:Admin@123   

- **Forgot Password**: Allows users to reset their password if they've forgotten it.
- **Register**: New users can register by creating an account.

it will login to the navebar page

The project contains a navbar with 3 menu items: Home, User, and About Us,Log Out.

- **Home**: Home Page Contains Details about the company

- **User**: User master which has:
  - A listing of Users
  - Each record in the listing page has an Edit icon and a Delete icon
  - **Add Button**: Used to add User information
    - When the Add button is clicked, the page is routed to an add component where you can fill in the fields and Register or Save. If canceled, you will be routed back to the listing page.
  - **Edit Button**: Using `Flag="Edit"`, the page is routed to the same add component with the values patched in. You can edit the changes and update or cancel to return to the listing page.
  - **Delete Icon**: On clicking the delete icon, a dialog box opens asking whether you want to delete the User or not. If yes, the selected row is deleted; if no, you are routed back to the listing page.
   - **UserStatus**:  A new column that allows you to click and update the user's status to either "Accept" or "Reject".
- **About Us**: Contains info about the company.
- **Log Out**: Log Outs and Redirected to login Page.

### API Part

The API is called as a static local API which should be running at the time the UI code is run.
