import Backendless from 'backendless';

export function getTeams() {
  return Backendless.CustomServices.invoke('TeamService', 'getTeams');
}
