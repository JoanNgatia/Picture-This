import Dispatcher from '../dispatcher/appDispatcher';
import request from 'superagent';
import toastr from 'toastr';

class BaseActions {
    get(url, actionType, token = null) {
        toastr.info('Loading your images...!', null, {
              timeOut: 2000
            });
        request
            .get(url)
            .set('Authorization', token)
            .end((err, result) => {
                Dispatcher.dispatch({
                    actionType: actionType,
                    data: result.body
                });
            });
    }

    delete(url, cb, token = null) {
        request
            .delete(url)
            .set('Authorization', token)
            .end((err, result) => {
                toastr.info('successfully removed ', {
                    timeOut: 2000,
                    closeButton: true
                });
                cb();
            });
    }

    put(url, actionType, data, token = null) {
        toastr.info('Updating ...', null, {
          timeOut: 2000
        });
        request
            .put(url)
            .send(data)
            .set('Authorization', token)
            .end((err, result) => {
                Dispatcher.dispatch({
                    actionType: actionType,
                    data: result.body
                });
            });
    }

    post(url, actionType, data, token = null) {
        request
            .post(url)
            .send(data)
            .set('Authorization', token)
            .end((err, result) => {
                Dispatcher.dispatch({
                    actionType: actionType,
                    data: result.body
                });
            });
    }

    deleteFromStore(id, actionType) {
        this.delete(`/api/photos/${id}`, ()=>{
          Dispatcher.dispatch({
            actionType,
            id
            });
        });
    }
}


let baseActions = new BaseActions();
export default baseActions;
