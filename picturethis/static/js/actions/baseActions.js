import Dispatcher from '../dispatcher/appDispatcher';
import request from 'superagent';

class BaseActions {
    get(url, actionType, token = null) {
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

    delete(url, actionType, token = null) {
        request
            .delete(url)
            .set('Authorization', token)
            .end((err, result) => {
                Dispatcher.dispatch({
                    actionType: actionType,
                    data: result.body
                });
            });
    }

    put(url, actionType, data, token = null) {
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
        Dispatcher.dispatch({
            actionType,
            id
        });
    }
}


let baseActions = new BaseActions();
export default baseActions;
