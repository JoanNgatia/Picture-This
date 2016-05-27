import constants from '../constants/appConstants';
import Dispatcher from '../dispatcher/appDispatcher';
import BaseStore from './baseStore';

let photos = null;
let newPhoto = null;
let filters = null;
let deletedPhoto = null;
let selectedPhoto = "./static/img/artpaint.jpeg";

class ImageStore extends BaseStore {
    constructor(){
        super();
    }

    setPhotos(results) {
        photos = results;
        this.emitChange('photo');
    }

    getPhotos() {
        return photos
    }

    setNewPhoto(results) {
        newPhoto = results;
        this.emitChange();
    }

    getNewPhoto() {
        return newPhoto
    }

    setFilters(results) {
        filters = results;
        this.emitChange('preview');
    }

    getFilters() {
        return filters
    }

    setSelectedPhoto(results) {
        selectedPhoto = results;
        this.emitChange('select');
    }

    getSelectedPhoto() {
        return selectedPhoto
    }

    setDeletedPhoto(results) {
        deletedPhoto = results;
        console.log('delete event', deletedPhoto);
        this.emitChange('delete');
    }

    getDeletedPhoto() {
        return deletedPhoto
    }

    deleteFromStore (id) {
        photos = photos.filter((photo) => {
            return photo.id !== id;
        })
    }
}

let imageStore = new ImageStore();

imageStore.dispatchToken = Dispatcher.register(action => {
    switch(action.actionType){
        case constants.GET_ALL_PHOTOS:
            imageStore.setPhotos(action.data);
            break;
        case constants.ADD_PHOTO:
            imageStore.setNewPhoto(action.data);
            break;
        case constants.GET_FILTERED_PHOTOS:
            imageStore.setFilters(action.data);
            break;
        case constants.DELETE_PHOTO:
            imageStore.setDeletedPhoto(action.data);
            break;
        case constants.DELETE_PHOTO_FROM_STORE:
            imageStore.deleteFromStore(action.id);
            break;
        default:
            return;
    }

    imageStore.emitChange();
});

export default imageStore;