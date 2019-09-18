import {API_SETTINGS} from './settings';

export default class Requests {
    constructor() {
    }

    news(keywords, beforeRequest, callback, afterRequest, error) {
        beforeRequest();
        fetch(`${API_SETTINGS.NEW_URL}q=${keywords}&${API_SETTINGS.NEW_PARAMS}`)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(`Что-то пошло не так: ${response.status}`);
            })
            .then((data) => {
                    callback(data);
            })
            .catch((err) => {
                error(err);
            })
            .finally(() => {
                afterRequest();
            });
    }

    commit(callback, afterRequest) {
        fetch(API_SETTINGS.GIT_URL)
            .then(function (response) {
                return response.json();
            })
            .then((data) => {
                callback(data)
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                afterRequest();
            });
    }

}

