# ContactUI

## Necessary Things

### Installed

- Install Node
- Install Angular CLI (`npm install -g @angular/cli@latest`)
- Run `npm install`
- Used CDN package of Bootstrap, no need for installation

## Description

### UI Part

The project contains a navbar with 3 menu items: Home, Contact, and About Us.

- **Home**: Default home page UI
- **Contact**: Contact master which has:
  - A listing of contacts
  - Each record in the listing page has an Edit icon and a Delete icon
  - **Add Button**: Used to add contact information
    - When the Add button is clicked, the page is routed to an add component where you can fill in the fields and Register or Save. If canceled, you will be routed back to the listing page.
  - **Edit Button**: Using `Flag="Edit"`, the page is routed to the same add component with the values patched in. You can edit the changes and update or cancel to return to the listing page.
  - **Delete Icon**: On clicking the delete icon, a dialog box opens asking whether you want to delete the contact or not. If yes, the selected row is deleted; if no, you are routed back to the listing page.
- **About Us**: Contains a simple about us description.

### API Part

The API is called as a static local API which should be running at the time the UI code is run.
