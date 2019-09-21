import {WEEKDAYS} from "./settings";

export default class Statistics {

    constructor(keywords, data) {
        this.keywords = keywords;
        this.data = data;
        this.countTitleResults = this.countTitleResults.bind(this);
        this.getArticlesPerDay = this.getArticlesPerDay.bind(this);
        this.displayGeneralStatistics = this.displayGeneralStatistics.bind(this);
        this.plottingDailyStatistics = this.plottingDailyStatistics.bind(this);
        this.countTitleResults();
        this.getArticlesPerDay();
        this.plottingDailyStatistics();
    }

    countTitleResults() {
        this.count = 0;
        this.data.articles.forEach(item => {
            if (item.title.toLowerCase().includes(this.keywords.toLowerCase())) {
                this.count++;
            }
        });
    }

    getArticlesPerDay() {
        this.articlesPerDay = {};
        this.data.articles.forEach(item => {
        const date = new Date(item.publishedAt.substring(0, 10)).getDate();
        if (date in this.articlesPerDay) {
            this.articlesPerDay[date]++;
        } else {
            this.articlesPerDay[date] = 1;
        }
        this.displayGeneralStatistics();
        });
    }

    displayGeneralStatistics() {
        document.querySelector('.keywords').textContent = this.keywords;
        document.querySelector('.total-results').textContent = this.data.totalResults;
        document.querySelector('.title-results').textContent = this.count;
    }

    plottingDailyStatistics() {
        let firstDay = new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000);
        for (let i = 0; i <= 6; i++) {
            const dayInMillisecond = i * 24 * 60 * 60 * 1000;
            const date =  new Date(firstDay.getTime() + dayInMillisecond);
            const day = date.getDate();
            const wday = WEEKDAYS[`${date.getDay()}`];
            document.querySelector(`.day${i}`).textContent =`${day}, ${wday}`;
            if (day in this.articlesPerDay) {
                const percent = this.articlesPerDay[`${day}`] * 100 / this.data.totalResults;
                document.querySelector(`.graph${i}`).setAttribute('width', `${percent}%`);
                document.querySelector(`.value${i}`).textContent = `${this.articlesPerDay[`${day}`]}`;
            } else {
                document.querySelector(`.graph${i}`).setAttribute('width', '0%');
                document.querySelector(`.value${i}`).textContent = '0';
            }
        }
    }
}