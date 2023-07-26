import sendRequest from './sendRequest';
const BASE_URL = '/api/reminders';

export function getAll() {
    return sendRequest(BASE_URL);
}
  
export function makeItem(newItem) {
    return sendRequest(`${BASE_URL}/create`,'POST', newItem);
}

export function updateItem(id, itemChanges) {
    return sendRequest(`${BASE_URL}/${id}/update`,'PUT', itemChanges);
}

export function deleteItem(id) {
return sendRequest(`${BASE_URL}/${id}`,'DELETE');
}