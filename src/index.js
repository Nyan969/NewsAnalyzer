import "./style.css";
import Request from './request';
import NewsCardList from './news-card-list';

const newsCardList = new NewsCardList();
const searchData = localStorage.getItem('data');

if (searchData) {
    newsCardList.processing(JSON.parse(searchData));
    document.forms.search.elements.keywords.value = `${localStorage.getItem('keywords')}`
}

function clickSearchButton(event) {
    event.preventDefault();
    const keywords = document.forms.search.elements.keywords.value.trim();
    newsCardList.remove();
    new Request().news(keywords, newsCardList.showPreloader, newsCardList.addToStorage, newsCardList.hidePreloader, newsCardList.renderError);
    newsCardList.connect();
    localStorage.setItem('keywords', keywords);
}

document.forms.search.addEventListener('submit', clickSearchButton);

