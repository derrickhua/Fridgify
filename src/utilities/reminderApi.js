import sendRequest from './sendRequest';
const BASE_URL = '/api/reminders';

export function getAll() {
    return sendRequest(BASE_URL);
}
  
export function makeRem(newRem) {
    return sendRequest(`${BASE_URL}/create`,'POST', newRem);
}

export function updateRem(id, remChanges) {
    return sendRequest(`${BASE_URL}/${id}/update`,'PUT', remChanges);
}

export function deleteRem(id) {
return sendRequest(`${BASE_URL}/${id}`,'DELETE');
}