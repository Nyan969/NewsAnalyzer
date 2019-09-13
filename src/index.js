import "./style.css";
import Requests from './requests';
import NewsCardList from './news-card-list';

document.forms.search.addEventListener('submit', buttonClick);

function buttonClick(event) {
    event.preventDefault();
    const Keywords = document.forms.search.elements.Keywords.value;
    const data = new Requests().news(Keywords);
    new NewsCardList().create(data);
}