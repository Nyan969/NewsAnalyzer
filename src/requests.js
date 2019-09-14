import {API_SETTINGS} from './settings';

export default class Requests {
    constructor() {
    }

    news(keywords, callback) {
        fetch(`${API_SETTINGS.NEW_URL}q=${keywords}&${API_SETTINGS.NEW_PARAMS}`)
            .then(function (response) {
                return response.json();
            })
            .then((data) => {
                callback(data);
            });
    }

    newsInTitle(Keywords) {
        fetch(`${API_SETTINGS.NEW_URL}qInTitle=${Keywords}&${API_SETTINGS.NEW_PARAMS}`)
            .then(function (response) {
                return response.json();
            })
            .then((data) => {
                return data.articles;
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
            .finally(() => {
                afterRequest();
            });
    }

}

