import {MONTHS} from "./settings";

export default class NewsCardList {
    #button = document.querySelector('.card-section__button');

    #errorTemplate = document.querySelector('#error-template');
    #errorTitle = this.#errorTemplate.content.querySelector('.results-section__title');
    #errorDescription = this.#errorTemplate.content.querySelector('.results-section__description');

    #cardSection = document.querySelector('.card-section');
    #cardSectionTitleBlock = document.querySelector('.card-section__title-block');

    #newsCardTemplate = document.querySelector('#news-card-template');
    #newsCardImage = this.#newsCardTemplate.content.querySelector('.news-card__image');
    #newsCardTitle = this.#newsCardTemplate.content.querySelector('.news-card__title');
    #newsCardText = this.#newsCardTemplate.content.querySelector('.news-card__text');
    #newsCardDate = this.#newsCardTemplate.content.querySelector('.news-card__date');
    #newsCardSource = this.#newsCardTemplate.content.querySelector('.news-card__source');
    #newsCardLink = this.#newsCardTemplate.content.querySelector('.news-card__link');

    constructor() {
        this.bind();
        this.connect();
    }

    bind() {
        this.addToStorage = this.addToStorage.bind(this);
        this.showMore = this.showMore.bind(this);
        this.processing = this.processing.bind(this);
        this.remove = this.remove.bind(this);
        this.showPreloader = this.showPreloader.bind(this);
        this.renderError = this.renderError.bind(this);
    }

    connect() {
        this.#button.addEventListener('click', this.showMore);
    }

    processing(data) {
        this.data = data;
        if (this.data.articles.length === 0) {
            this.renderNotFound();
        } else if (this.data.articles.length > 3) {
            this.#button.classList.remove('button_disabled');
            this.createCard(this.data.articles.splice(0, 3));
        } else {
            document.querySelector('.card-section__button').classList.add('button_disabled');
            this.createCard(this.data.articles);
            this.#button.removeEventListener('click', this.showMore);
        }
    }

    showMore() {
        this.processing(this.data);
    }

    addToStorage(data) {
        localStorage.setItem('data', JSON.stringify(data));
        this.processing(JSON.parse(localStorage.getItem('data')));
    }

    createCard(data) {
        this.#cardSectionTitleBlock.setAttribute('style', `display: flex`);
        this.#cardSection.setAttribute('style', `display: flex`);

        data.forEach(item => {
            const date = new Date(Date.parse(item.publishedAt));

            this.#newsCardImage.setAttribute('src', `${item.urlToImage}`);
            this.#newsCardTitle.textContent = item.title;
            this.#newsCardText.textContent = item.description;
            this.#newsCardDate.textContent = `${date.getDate()} ${MONTHS[`${date.getMonth()}`]}, ${date.getFullYear()}`;
            this.#newsCardSource.textContent = item.source['name'];
            this.#newsCardLink.setAttribute('href', `${item.url}`);

            const newsCard = document.importNode(this.#newsCardTemplate.content, true);
            document.querySelector('.card-section__news-grid').appendChild(newsCard);
        });
    }

    remove() {
        localStorage.clear();
        this.#button.removeEventListener('click', this.showMore);
        const element = document.querySelector('.card-section__news-grid');
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
        const res = document.querySelector('.results-section');
        while (res.firstChild) {
            res.removeChild(res.firstChild);
        }

        this.#cardSection.removeAttribute('style');
        this.#cardSectionTitleBlock.removeAttribute('style');

        document.querySelector('.card-section__button').classList.add('button_disabled');
    }

    showPreloader() {
        this.#cardSection.setAttribute('style', `display: flex`);
        const preloaderTemplate = document.querySelector('#preloader-template');
        const preloader = document.importNode(preloaderTemplate.content, true);
        document.querySelector('.results-section').appendChild(preloader);
    }

    hidePreloader() {
        document.querySelector('.circle-preloader').remove();
        document.querySelector('.results-section__description').remove();
    }

    renderError(err) {
        this.#errorTitle.textContent = 'Упс...';
        this.#errorDescription.textContent = ` ${err}`;

        const error = document.importNode(this.#errorTemplate.content, true);
        document.querySelector('.results-section').appendChild(error);

        localStorage.clear();
    }

    renderNotFound() {
        this.#errorTitle.textContent = 'Ничего не найдено';
        this.#errorDescription.textContent = `К сожалению по вашему запросу ничего не найдено.`;

        const notFound = document.importNode(this.#errorTemplate.content, true);
        document.querySelector('.results-section').appendChild(notFound);

        localStorage.clear();
    }
}