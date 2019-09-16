import "./style.css";
import Requests from './requests';
import NewsCardList from './news-card-list';

const newsCardList = new NewsCardList();
localStorage.getItem('data') ? newsCardList.processing(JSON.parse(localStorage.getItem('data'))) : '';

document.forms.search.addEventListener('submit', buttonClick);

function buttonClick(event) {
    event.preventDefault();
    const keywords = document.forms.search.elements.keywords.value;
    newsCardList.remove();
    new Requests().news(keywords, newsCardList.startPreloader, newsCardList.addToStorage, newsCardList.stopPreloader, newsCardList.renderError);
    newsCardList.connect();
    localStorage.setItem('keywords', keywords);
}