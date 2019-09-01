import "../../style.css";
import "../../../node_modules/@glidejs/glide/dist/css/glide.core.min.css"
import "../../../node_modules/@glidejs/glide/dist/css/glide.theme.min.css"

import Glide from '@glidejs/glide';

new Glide('.glide', {
    focusAt: "center",
    startAt: 3,
    perView: 4,
    peek: 0,
    gap: 16,
    breakpoints: {
        320: {
            gap: 8,
            peek: 0,
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
}).mount();