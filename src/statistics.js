export default class Statistics {
    constructor(keywords, data) {
        this.keywords = keywords;
        this.data = data;
        this.countTitleResults = this.countTitleResults.bind(this);
        this.displayGeneralStatistics = this.displayGeneralStatistics.bind(this);
        this.countTitleResults();
        this.dailyStatisticsCount(data);
    }

    countTitleResults() {
        let count = 0;
        this.data.articles.forEach(item => {
            item.title.includes(this.keywords) ? count++ : '';
        });
        this.displayGeneralStatistics(count);
    }

    displayGeneralStatistics(count) {
        document.querySelector('.keywords').textContent = this.keywords;
        document.querySelector('.total-results').textContent = this.data.totalResults;
        document.querySelector('.title-results').textContent = count;
    }

    dailyStatisticsCount() {

    }

    dailyStatisticsDisplay() {

    }
}