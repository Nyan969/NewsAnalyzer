import Glide from "@glidejs/glide";
import {MONTHS} from "./settings";

export default class CommitCardList {
    constructor() {

    }

    create(data) {
        const commitCardTemplate = document.querySelector('#commit-card-template');
        //  const bulletTemplate = document.querySelector('#bullet-template');

        const commitCardImage = commitCardTemplate.content.querySelector('.commit-card__image');
        const commitCardTitle = commitCardTemplate.content.querySelector('.commit-card__title');
        const commitCardText = commitCardTemplate.content.querySelector('.commit-card__description');
        const commitCardDate = commitCardTemplate.content.querySelector('.commit-card__info');
        const commitCardMail = commitCardTemplate.content.querySelector('.commit-card__info_mail');
        const commitCardLink = commitCardTemplate.content.querySelector('.commit-card__link');

        // let n = 0;

        // const glideBullet = bulletTemplate.querySelector('.slider-box__bullet');

        data.forEach(item => {
            console.log(item);
            //    console.log(glideBullet);
            //    glideBullet.setAttribute('data-glide-dir', `=${n}`);

            // commitCardImage.setAttribute('src', `${item.author['avatar_url']}`);
            commitCardTitle.textContent = item.commit.committer['name'];
            commitCardText.textContent = item.commit['message'];
            commitCardDate.textContent = item.commit.committer['date'];
            commitCardMail.textContent = item.commit.committer['email'];
            commitCardLink.setAttribute('href', `${item['html_url']}`);


            let clone = document.importNode(commitCardTemplate.content, true);
            document.querySelector('.glide__slides').appendChild(clone);

            // let bullet = document.importNode(bulletTemplate.content, true);
            // document.querySelector('.glide__bullets').appendChild(bullet);
            //
            // n++;

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