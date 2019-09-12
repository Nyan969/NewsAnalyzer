/*let element = document.querySelector('.card-section__news-grid');
while (element.firstChild) {
    element.removeChild(element.firstChild);
}*/

export default class NewsCardList {
    constructor() {

    }

    create(arr) {
        const newsCardTemplate = document.querySelector('#news-card-template');

        const newsCardImage = newsCardTemplate.content.querySelector('.news-card__image');
        const newsCardTitle = newsCardTemplate.content.querySelector('.news-card__title');
        const newsCardText = newsCardTemplate.content.querySelector('.news-card__text');
        const newsCardDate = newsCardTemplate.content.querySelector('.news-card__date');
        const newsCardSource = newsCardTemplate.content.querySelector('.news-card__source');
        const newsCardLink = newsCardTemplate.content.querySelector('.news-card__link');

        if (arr.length > 3) {
            document.querySelector('.card-section__button').classList.remove('button_disabled');
            let addarr = arr.splice(0, 3);
            addarr.forEach(item => {
                newsCardImage.setAttribute('src', `${item.urlToImage}`);
                newsCardTitle.textContent = item.title;
                newsCardText.textContent = item.description;
                newsCardDate.textContent = item.publishedAt;
                newsCardSource.textContent = item.source['name'];
                newsCardLink.setAttribute('href', `${item.url}`);

                let clone = document.importNode(newsCardTemplate.content, true);
                document.querySelector('.card-section__news-grid').appendChild(clone);
            });

        } else {
            document.querySelector('.card-section__button').classList.add('button_disabled');

            arr.forEach(item => {
                newsCardImage.setAttribute('src', `${item.urlToImage}`);
                newsCardTitle.textContent = item.title;
                newsCardText.textContent = item.description;
                newsCardDate.textContent = item.publishedAt;
                newsCardSource.textContent = item.source['name'];
                newsCardLink.setAttribute('href', `${item.url}`);

                let clone = document.importNode(newsCardTemplate.content, true);
                document.querySelector('.card-section__news-grid').appendChild(clone);

                const cardSection = document.querySelector('.card-section');
                cardSection.setAttribute('style', `display: flex`);


                const addButton = document.querySelector('.card-section__button');
                addButton.addEventListener('click', create);
            });

        }
    }
}