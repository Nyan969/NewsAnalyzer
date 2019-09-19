import "../style.css";
import "../../node_modules/@glidejs/glide/dist/css/glide.core.css";
import "../../node_modules/@glidejs/glide/dist/css/glide.theme.css";
import Requests from '../requests';
import CommitCardList from '../commit-card-list';

const commitCardList = new CommitCardList();
commitCardList.startPreloader();
new Requests().commit(commitCardList.createCard, commitCardList.stopPreloader);

