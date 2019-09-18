import "./style.css";
import Requests from './requests';
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
    new Requests().news(keywords, newsCardList.startPreloader, newsCardList.addToStorage, newsCardList.stopPreloader, newsCardList.renderError);
    newsCardList.connect();
    localStorage.setItem('keywords', keywords);
}