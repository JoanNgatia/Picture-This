import constants from '../constants/appConstants';
import Dispatcher from '../dispatcher/appDispatcher';
import BaseStore from './baseStore';


class ImageStore extends BaseStore {
    constructor(){
        super();
        this.photos = null;
        this.newPhoto = null;
        this.filters = null;
        this.deletedPhoto = null;
        this.selectedPhoto = "./static/img/artpaint.jpeg";
    }

    setPhotos(results) {
        this.photos = results;
        this.emitChange('photo');
    }

    getPhotos() {
        return this.photos
    }

    setNewPhoto(results) {
        this.newPhoto = results;
        this.emitChange();
    }

    getNewPhoto() {
        return this.newPhoto
    }

    setFilters(results) {
        this.filters = results;
        this.emitChange('preview');
    }

    getFilters() {
        return this.filters
    }

    setSelectedPhoto(results) {
        this.selectedPhoto = results;
        this.emitChange('select');
    }

    getSelectedPhoto() {
        return this.selectedPhoto
    }

    deleteFromStore (id) {
        this.photos = this.photos.filter((photo) => {
            return photo.id !== id;
        });
        this.emitChange('delete');
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
            imageStore.deleteFromStore(action.id);
            break;
        default:
            break;
    }

    // imageStore.emitChange();
});

export default imageStore;