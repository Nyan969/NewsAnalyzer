import Glide from "@glidejs/glide";
import {MONTHS} from "./settings";

export default class CommitCardList {
    #commitCardTemplate = document.querySelector('#commit-card-template');
    #commitCardImage = this.#commitCardTemplate.content.querySelector('.commit-card__image');
    #commitCardTitle = this.#commitCardTemplate.content.querySelector('.commit-card__title');
    #commitCardText = this.#commitCardTemplate.content.querySelector('.commit-card__description');
    #commitCardDate = this.#commitCardTemplate.content.querySelector('.commit-card__info');
    #commitCardMail = this.#commitCardTemplate.content.querySelector('.commit-card__info_mail');
    #commitCardLink = this.#commitCardTemplate.content.querySelector('.commit-card__link');

    #bulletTemplate = document.querySelector('#bullet-template');
    #glideBullet = this.#bulletTemplate.content.querySelector('.glide__bullet');

    constructor() {
        this.createCard = this.createCard.bind(this);
    }
//отрисовка карточек с коммитом
    createCard(data) {
        let numb = 0;
        data.forEach(item => {
            this.#glideBullet.setAttribute('data-glide-dir', `=${numb}`);
            const date = new Date(Date.parse(item.commit['committer']['date']));
            const avatar = (item.author === null ? 'https://avatars2.githubusercontent.com/u/53269794?s=460&v=4' : item.author['avatar_url']);
            this.#commitCardImage.setAttribute('data-src', `${avatar}`);
            this.#commitCardTitle.textContent = item.commit['committer']['name'];
            this.#commitCardText.textContent = item.commit['message'];
            this.#commitCardDate.textContent = `${date.getDate()} ${MONTHS[`${date.getMonth()}`]}, ${date.getFullYear()}`;
            this.#commitCardMail.textContent = item.commit['committer']['email'];
            this.#commitCardLink.setAttribute('href', `${item['html_url']}`);

            const commitCard = document.importNode(this.#commitCardTemplate.content, true);
            document.querySelector('.glide__slides').appendChild(commitCard);
            const bullet = document.importNode(this.#bulletTemplate.content, true);
            document.querySelector('.glide__bullets').appendChild(bullet);

            numb++;
        });
        CommitCardList.createGlide();
    }
//отрисовка слайдера
    static createGlide() {
        const glide = new Glide('.glide', {
            focusAt: "center",
            startAt: 3,
            perView: 4,
            peek: 0,
            gap: 16,
            breakpoints: {
                320: {
                    gap: 8,
                    peek: 16,
                    perView: 1
                },
                540: {
                    perView: 1,
                    gap: 8,
                    peek: 40,
                },
                768: {
                    perView: 2,
                    gap: 8
                },
                1040: {
                    perView: 3,
                    peek: 0
                },
                1440: {
                    perView: 3,
                    peek: 88
                }
            }
        });
        glide.mount();
    }
//отрисовка прилодера
    static showPreloader() {
        const preloaderTemplate = document.querySelector('#preloader-template');
        const preloader = document.importNode(preloaderTemplate.content, true);
        document.querySelector('.slider-box').appendChild(preloader);
    }
//удаление прилодера
    static hidePreloader() {
        document.querySelector('.circle-preloader').remove();
        document.querySelector('.results-section__description').remove();
    }
}

