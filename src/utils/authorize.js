import { redirect } from "react-router-dom";

export const getRoleUser = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
  if(!currentUser){
    return null;
  }

  const roleUser = currentUser.role;

  if(!roleUser){
    return null;
  }

  return roleUser;
}

export const authorize = () => {
  const roleUser = getRoleUser();

  if(roleUser !== 'admin'){
    return redirect('/chat');
  }

  return null;
}