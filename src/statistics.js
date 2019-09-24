import {WEEKDAYS} from "./settings";

export default class Statistics {
    #firstDay = new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000);

    constructor(keywords, data) {
        this.keywords = keywords;
        this.data = data;
        this.countTitleResults();
        this.getArticlesPerDay();
    }
//подсчет количества новостей, у которых ключевое слово используется в заголовке
    countTitleResults() {
        let count = 0;
        this.data.articles.forEach(item => {
            if (item.title.toLowerCase().includes(this.keywords.toLowerCase())) {
                count++;
            }
        });
        this.displayGeneralStatistics(count);
    }
//подсчет вышедших статей в день
    getArticlesPerDay() {
        const articlesPerDay = {};
        this.data.articles.forEach(item => {
            const date = new Date(item.publishedAt.substring(0, 10)).getDate();
            if (date in articlesPerDay) {
                articlesPerDay[date]++;
            } else {
                articlesPerDay[date] = 1;
            }
        });
        this.plottingDailyStatistics(articlesPerDay);
    }
//отображение общей статистики
    displayGeneralStatistics(count) {
        document.querySelector('.keywords').textContent = this.keywords;
        document.querySelector('.total-results').textContent = this.data.totalResults;
        document.querySelector('.title-results').textContent = count;
    }
//отрисовка графика
    plottingDailyStatistics(articlesPerDay) {
        for (let i = 0; i <= 6; i++) {
            const dayInMillisecond = i * 24 * 60 * 60 * 1000;
            const date = new Date(this.#firstDay.getTime() + dayInMillisecond);
            const day = date.getDate();
            const wday = WEEKDAYS[`${date.getDay()}`];
            document.querySelector(`.day${i}`).textContent = `${day}, ${wday}`;
            if (day in articlesPerDay) {
                const percent = articlesPerDay[`${day}`] * 100 / this.data.totalResults;
                document.querySelector(`.graph${i}`).setAttribute('width', `${percent}%`);
                document.querySelector(`.value${i}`).textContent = `${articlesPerDay[`${day}`]}`;
            } else {
                document.querySelector(`.graph${i}`).setAttribute('width', '0%');
                document.querySelector(`.value${i}`).textContent = '0';
            }
        }
    }
}