import Backendless from 'backendless';

export function getCurrentUser() {
  return Backendless.UserService.getCurrentUser();
}

export function login(email, password) {
  return Backendless.UserService.login(email, password, true);
}

export function logout() {
  return Backendless.UserService.logout();
}

export function getUsers() {
  return Backendless.CustomServices.invoke('UserService', 'getUsers');
}

export function createUser(newUser) {
  return Backendless.CustomServices.invoke(
    'UserService',
    'createUser',
    newUser
  );
}
