import "./style.css";
import Requests from './requests';
import NewsCardList from './news-card-list';

document.forms.search.addEventListener('submit', buttonClick);

function buttonClick(event) {
    event.preventDefault();
    const Keywords = document.forms.search.elements.Keywords.value;
    new NewsCardList().create(new Requests().news(Keywords));
}