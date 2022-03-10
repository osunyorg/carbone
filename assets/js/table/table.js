import Tablesort from 'tablesort';
window.Tablesort = Tablesort;

export const makeSortableTable = function () {
    const table = document.querySelector('table');
    new Tablesort(table, { sortAttribute: 'data-custom-sort-val' });
};
