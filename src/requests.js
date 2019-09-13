import {API_SETTINGS} from './settings';

export default class Requests {
    constructor() {
    }

    news(Keywords) {
        fetch(`${API_SETTINGS.NEW_URL}q=${Keywords}&${API_SETTINGS.NEW_PARAMS}`)
            .then(function (response) {
                return response.json();
            })
            .then((data) => {
                return data.articles;
            });
    }

    commit(callback) {
        fetch(API_SETTINGS.GIT_URL)
            .then(function (response) {
                return response.json();
            })
            .then((data) => {
                callback(data)
            });
    }

}
