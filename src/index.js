import "./style.css";
import Request from './request';
import NewsCardList from './news-card-list';

const newsCardList = new NewsCardList();
const searchData = localStorage.getItem('data');

if (searchData && JSON.parse(searchData).totalResults !== 0) {
    newsCardList.processing(JSON.parse(searchData));
    document.forms.search.elements.keywords.value = `${localStorage.getItem('keywords')}`
}

document.forms.search.addEventListener('submit', buttonClick);

function buttonClick(event) {
    event.preventDefault();
    const keywords = document.forms.search.elements.keywords.value;
    newsCardList.remove();
    new Request().news(keywords, newsCardList.showPreloader, newsCardList.addToStorage, newsCardList.hidePreloader, newsCardList.renderError);
    newsCardList.connect();
    localStorage.setItem('keywords', keywords);
}