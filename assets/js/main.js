import './vendors/bootstrap';
import { makeUniversityChart } from './charts/university.js';
import { makeUniversitiesChart } from './charts/universities.js';
import { makeSortableTable } from './table/table.js';
import 'tablesort/src/sorts/tablesort.number';

if (document.body.classList.contains('universities__page')) {
    makeUniversityChart();
}

if (document.body.classList.contains('page__home')) {
    makeUniversitiesChart();
    makeSortableTable();
}
