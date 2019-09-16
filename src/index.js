import "./style.css";
import Requests from './requests';
import NewsCardList from './news-card-list';

const newsCardList = new NewsCardList();

document.forms.search.addEventListener('submit', buttonClick);

function buttonClick(event) {
    event.preventDefault();
    const keywords = document.forms.search.elements.keywords.value;
    newsCardList.remove();
    new Requests().news(keywords, newsCardList.startPreloader, newsCardList.processing, newsCardList.stopPreloader, newsCardList.renderError);
    newsCardList.connect();
}