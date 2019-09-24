import "./style.css";
import Request from './request';
import NewsCardList from './news-card-list';
import LazyLoad from './lazy-load-Image';


const newsCardList = new NewsCardList();
const searchData = localStorage.getItem('data');
//проверяет есть ли в ls результат поиска
if (searchData) {
    newsCardList.processing(JSON.parse(searchData));
    document.forms.search.elements.keywords.value = `${localStorage.getItem('keywords')}`
    newsCardList.connect();
}
function clickSearchButton(event) {
    event.preventDefault();
    const keywords = document.forms.search.elements.keywords.value.trim();
    newsCardList.remove();
    new Request().news(keywords, newsCardList.showPreloader, newsCardList.addToStorage, NewsCardList.hidePreloader, newsCardList.renderError);
    newsCardList.connect();
    localStorage.setItem('keywords', keywords);
}

document.forms.search.addEventListener('submit', clickSearchButton);

const lazyLoad = new LazyLoad();
document.addEventListener("DOMContentLoaded", lazyLoad.lazyLoadBG());