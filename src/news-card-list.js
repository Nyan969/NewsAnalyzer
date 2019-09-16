import {MONTHS} from "./settings";

export default class NewsCardList {
    constructor() {
        this.showMore = this.showMore.bind(this);
        this.processing = this.processing.bind(this);
        this.remove = this.remove.bind(this);
        this.button = document.querySelector('.card-section__button');
        this.connect = this.connect.bind(this);
    }

    connect() {
        this.button.addEventListener('click', this.showMore);
    }
    processing(data) {
        this.data = data;
        console.log(this.data);
        if (this.data.articles.length === 0) {
            this.renderNotFound();
        } else if (this.data.articles.length > 3) {
            this.button.classList.remove('button_disabled');
            this.createCard(this.data.articles.splice(0, 3));
        } else {
            document.querySelector('.card-section__button').classList.add('button_disabled');
            this.createCard(this.data.articles);
            this.button.removeEventListener('click', this.showMore);
        }
    }

    showMore() {
        this.processing(this.data);
    }

    createCard(data) {
        const newsCardTemplate = document.querySelector('#news-card-template');

        const newsCardImage = newsCardTemplate.content.querySelector('.news-card__image');
        const newsCardTitle = newsCardTemplate.content.querySelector('.news-card__title');
        const newsCardText = newsCardTemplate.content.querySelector('.news-card__text');
        const newsCardDate = newsCardTemplate.content.querySelector('.news-card__date');
        const newsCardSource = newsCardTemplate.content.querySelector('.news-card__source');
        const newsCardLink = newsCardTemplate.content.querySelector('.news-card__link');

        const cardSectionTitleBlock = document.querySelector('.card-section__title-block');
        cardSectionTitleBlock.setAttribute('style', `display: flex`);
        const cardSection = document.querySelector('.card-section');
        cardSection.setAttribute('style', `display: flex`);

        data.forEach(item => {
            const date = new Date(Date.parse(item.publishedAt));

            newsCardImage.setAttribute('src', `${item.urlToImage}`);
            newsCardTitle.textContent = item.title;
            newsCardText.textContent = item.description;
            newsCardDate.textContent = `${date.getDate()} ${MONTHS[`${date.getMonth()}`]}, ${date.getFullYear()}`;
            newsCardSource.textContent = item.source['name'];
            newsCardLink.setAttribute('href', `${item.url}`);

            let newsCard = document.importNode(newsCardTemplate.content, true);
            document.querySelector('.card-section__news-grid').appendChild(newsCard);
        });


    }

    remove() {
        this.data = undefined;
        this.button.removeEventListener('click', this.showMore);
        let element = document.querySelector('.card-section__news-grid');
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
        let res = document.querySelector('.results-section');
        while (res.firstChild) {
            res.removeChild(res.firstChild);
        }

        const cardSection = document.querySelector('.card-section');
        cardSection.removeAttribute('style');
        const cardSectionTitleBlock = document.querySelector('.card-section__title-block');
        cardSectionTitleBlock.removeAttribute('style');
    }

    startPreloader() {
        const cardSection = document.querySelector('.card-section');
        cardSection.setAttribute('style', `display: flex`);
        const preloaderTemplate = document.querySelector('#preloader-template');
        let preloader = document.importNode(preloaderTemplate.content, true);
        document.querySelector('.results-section').appendChild(preloader);
    }

    stopPreloader() {
        document.querySelector('.circle-preloader').remove();
        document.querySelector('.results-section__description').remove();
    }

    renderError(err) {
        const errorTemplate = document.querySelector('#error-template');

        const errorTitle = errorTemplate.content.querySelector('.results-section__title');
        const errorDescription = errorTemplate.content.querySelector('.results-section__description');

        errorTitle.textContent = 'Что-то пошло не так...';
        errorDescription.textContent = `${err}`;

        let error = document.importNode(errorTemplate.content, true);
        document.querySelector('.results-section').appendChild(error);
    }

    renderNotFound() {
        const notFoundTemplate = document.querySelector('#error-template');
        let notFound = document.importNode(notFoundTemplate.content, true);
        document.querySelector('.results-section').appendChild(notFound);
    }
}