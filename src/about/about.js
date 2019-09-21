import "../style.css";
import "../../node_modules/@glidejs/glide/dist/css/glide.core.css";
import "../../node_modules/@glidejs/glide/dist/css/glide.theme.css";
import Request from '../request';
import CommitCardList from '../commit-card-list';

const commitCardList = new CommitCardList();
commitCardList.showPreloader();
new Request().commit(commitCardList.createCard, commitCardList.hidePreloader);

