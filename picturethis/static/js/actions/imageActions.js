import BaseActions from './baseActions';
import constants from '../constants/appConstants';

export function getallphotos() {
    BaseActions.get('/api/photos/', constants.GET_ALL_PHOTOS)
}

export function addphotos(photo) {
    BaseActions.post('/api/photos/', constants.ADD_PHOTO, photo)
}

export function getimagefilters(id) {
    BaseActions.get(`/api/photos/${id}/edits`, constants.GET_FILTERED_PHOTOS)
}

export function savefinalimage(photo_id, preview_id, saved) {
    BaseActions.put(`api/photos/${photo_id}/edits/${preview_id}`, constants.SAVE_FILTERED_PHOTO, saved)
}

export function deleteimage(id) {
    BaseActions.delete(`/api/photos/${id}`, constants.DELETE_PHOTO)
}

export function deleteimagefromstore(id) {
    BaseActions.deleteFromStore(id, constants.DELETE_PHOTO)
}
