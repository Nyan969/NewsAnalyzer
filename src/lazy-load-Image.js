export default class LazyLoad {
       constructor() {
    }

//ленивая загрузка фоновых картинок
    lazyLoadBG() {
        const lazyloadBG = document.querySelectorAll(".bg-lazy");
        if ("IntersectionObserver" in window) {

            const imageObserver = new IntersectionObserver(function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        const image = entry.target;
                        image.classList.remove("bg-lazy");
                        imageObserver.unobserve(image);
                    }
                });
            });
            lazyloadBG.forEach(function (image) {
                imageObserver.observe(image);
            });
        } else {
            let lazyloadThrottleTimeout;
            function lazyload() {
                if (lazyloadThrottleTimeout) {
                    clearTimeout(lazyloadThrottleTimeout);
                }
                lazyloadThrottleTimeout = setTimeout(function () {
                    const scrollTop = window.pageYOffset;
                    lazyloadBG.forEach(function (img) {
                        if (img.offsetTop < (window.innerHeight + scrollTop)) {
                            img.src = img.dataset.src;
                            img.classList.remove('bg-lazy');
                        }
                    });
                    if (lazyloadBG.length == 0) {
                        document.removeEventListener("scroll", lazyload);
                        window.removeEventListener("resize", lazyload);
                        window.removeEventListener("orientationChange", lazyload);
                    }
                }, 20);
            }

            document.addEventListener("scroll", lazyload);
            window.addEventListener("resize", lazyload);
            window.addEventListener("orientationChange", lazyload);
        }
    }

//ленивая загрузка картинок

    lazyLoadImage() {
        const lazyloadImages = document.querySelectorAll(".lazy");
        if ("IntersectionObserver" in window) {
            const imageObserver = new IntersectionObserver(function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        const image = entry.target;
                        image.src = image.dataset.src;
                        image.classList.remove("lazy");
                        imageObserver.unobserve(image);
                    }
                });
            });
            lazyloadImages.forEach(function (image) {
                imageObserver.observe(image);
            });
        } else {
            let lazyloadThrottleTimeout;
            function lazyload() {
                if (lazyloadThrottleTimeout) {
                    clearTimeout(lazyloadThrottleTimeout);
                }
                lazyloadThrottleTimeout = setTimeout(function () {
                    const scrollTop = window.pageYOffset;
                    lazyloadImages.forEach(function (img) {
                        if (img.offsetTop < (window.innerHeight + scrollTop)) {
                            console.log(img.src, img.dataset.src);
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                        }
                    });
                    if (lazyloadImages.length == 0) {
                        document.removeEventListener("scroll", lazyload);
                        window.removeEventListener("resize", lazyload);
                        window.removeEventListener("orientationChange", lazyload);
                    }
                }, 20);
            }
            document.addEventListener("scroll", lazyload);
            window.addEventListener("resize", lazyload);
            window.addEventListener("orientationChange", lazyload);
        }
    }
}
