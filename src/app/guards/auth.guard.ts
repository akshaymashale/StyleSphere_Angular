// Guard ==> Essential tools for controlling access to routes and ensuring certain conditions are met before navigating to a particular route
// - Used to protect routes from unauthorized access 

import { CanActivateFn } from '@angular/router';

// CanActivate Guard ==> Ensures that only authenticated users can access specific routes.
// CanActivateChild Guard ==> Checks if a user has the required permissions to access child routes.
// Resolve ==> Preloads data for routes.
// CanDeactivate ==> Ensures users can safely navigate away from routes.
// CanLoad ==> Controls lazy loading of modules.
export const authGuard: CanActivateFn = (route, state) => {
  let userstatus = localStorage.getItem("logged");
  if(userstatus == 'true'){
    console.log("userstatus + " + userstatus);
    return true;
  }
  else{
    return false
  }
};
