import "../style.css";
import Statistics from '../statistics'

new Statistics(localStorage.getItem('keywords'), JSON.parse(localStorage.getItem('data')));