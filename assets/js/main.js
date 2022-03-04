import './bootstrap';
import { makeUniversityChart } from './charts/university.js';
import { makeUniversitiesChart } from './charts/universities.js';

if (document.body.classList.contains('universities__page')) {
    makeUniversityChart();
}

if (document.body.classList.contains('page__home')) {
    makeUniversitiesChart();
}
