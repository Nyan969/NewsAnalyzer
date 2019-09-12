import "./style.css";
import Request from './request';
import NewsCardList from './news-card-list';


const searchButton = document.querySelector('.search-section__button');
searchButton.addEventListener('click', function () {
    const Keywords = document.forms.search.elements.Keywords.value;
    new NewsCardList().create(new Request().news(Keywords));
});