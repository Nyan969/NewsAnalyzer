import "../style.css";
import "../../node_modules/@glidejs/glide/dist/css/glide.core.css";
import "../../node_modules/@glidejs/glide/dist/css/glide.theme.css";
import Request from '../request';
import CommitCardList from '../commit-card-list';
import LazyLoad from '../lazy-load-Image';

const commitCardList = new CommitCardList();
commitCardList.showPreloader();
new Request().commit(commitCardList.createCard, commitCardList.hidePreloader);
const lazyLoad = new LazyLoad();
document.addEventListener("DOMContentLoaded", lazyLoad.lazyLoadBG());

//отслеживает загрузку карточек с коммитами
let mutationObserver = new MutationObserver(function(mutations) {
    if (document.querySelector('.lazy')){
        document.addEventListener("DOMContentLoaded", lazyLoad.lazyLoadImage());
    }
});

mutationObserver.observe(document.querySelector('.glide__slides'), {attributes: true, childList: true, characterData: true});