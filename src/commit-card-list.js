import Glide from "@glidejs/glide";
import {MONTHS} from "./settings";

export default class CommitCardList {
    constructor() {
        this.createCard = this.createCard.bind(this);
    }

    createCard(data) {
        const commitCardTemplate = document.querySelector('#commit-card-template');
        const bulletTemplate = document.querySelector('#bullet-template');
        const commitCardImage = commitCardTemplate.content.querySelector('.commit-card__image');
        const commitCardTitle = commitCardTemplate.content.querySelector('.commit-card__title');
        const commitCardText = commitCardTemplate.content.querySelector('.commit-card__description');
        const commitCardDate = commitCardTemplate.content.querySelector('.commit-card__info');
        const commitCardMail = commitCardTemplate.content.querySelector('.commit-card__info_mail');
        const commitCardLink = commitCardTemplate.content.querySelector('.commit-card__link');

        let numb = 0;
        const glideBullet = bulletTemplate.content.querySelector('.glide__bullet');

        data.forEach(item => {
            glideBullet.setAttribute('data-glide-dir', `=${numb}`);
            const date = new Date(Date.parse(item.commit['committer']['date']));
            const avatar = (item.author === null ? 'https://avatars2.githubusercontent.com/u/53269794?s=460&v=4' : item.author['avatar_url']);
            commitCardImage.setAttribute('src', `${avatar}`);
            commitCardTitle.textContent = item.commit['committer']['name'];
            commitCardText.textContent = item.commit['message'];
            commitCardDate.textContent = `${date.getDate()} ${MONTHS[`${date.getMonth()}`]}, ${date.getFullYear()}`;
            commitCardMail.textContent = item.commit['committer']['email'];
            commitCardLink.setAttribute('href', `${item['html_url']}`);


            let commitCard = document.importNode(commitCardTemplate.content, true);
            document.querySelector('.glide__slides').appendChild(commitCard);

            let bullet = document.importNode(bulletTemplate.content, true);
            document.querySelector('.glide__bullets').appendChild(bullet);

            numb++;
        });
        this.createGlide();
    }

    createGlide() {
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

    startPreloader() {
        const preloaderTemplate = document.querySelector('#preloader-template');
        let preloader = document.importNode(preloaderTemplate.content, true);
        document.querySelector('.slider-box').appendChild(preloader);
    }

    stopPreloader() {
        document.querySelector('.circle-preloader').remove();
        document.querySelector('.results-section__description').remove();
    }

}

