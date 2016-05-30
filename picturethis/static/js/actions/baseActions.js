import Dispatcher from '../dispatcher/appDispatcher';
import request from 'superagent';
import toastr from 'toastr';

class BaseActions {
    get(url, actionType, token = null) {
        window.Materialize.toast('Getting your images...', 2000, 'success-toast');
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
                window.Materialize.toast('successfully deleted...', 2000, 'success-toast');
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
