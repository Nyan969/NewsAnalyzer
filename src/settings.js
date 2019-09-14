const sixDaysInMillisecond = 6 * 24 * 60 * 60 * 1000;

const today = new Date();
const weekAgo = new Date(new Date().getTime() - sixDaysInMillisecond);

const year = today.getFullYear();
const mount = today.getMonth();
const day = today.getDate();

const yearWeekAgo = weekAgo.getFullYear();
const mountWeekAgo = weekAgo.getMonth();
const dayWeekAgo = weekAgo.getDate();


export const API_SETTINGS = {
    NEW_URL: 'https://newsapi.org/v2/everything?',
    NEW_PARAMS: `from=${yearWeekAgo}-${mountWeekAgo + 1}-${dayWeekAgo}&to=${year}-${mount + 1}-${day}&language=ru&pageSize=100&apiKey=362638abff334f7eb40cab5ccaab36a3`,
    GIT_URL: 'https://api.github.com/repos/Nyan969/NewsAnalyzer/commits',
};

export const MONTHS = {
    0: 'января',
    1: 'февраля',
    2: 'марта',
    3: 'апреля',
    4: 'мая',
    5: 'июня',
    6: 'июля',
    7: 'августа',
    8: 'сентября',
    9: 'октября',
    10: 'ноября',
    11: 'декабря'
};