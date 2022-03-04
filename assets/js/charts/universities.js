import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export const makeUniversitiesChart = function () {
    const table = document.querySelector('.table'),
        tons = [];
    let name,
        tonsPerYear,
        osunyTonsPerYear;

    table.querySelectorAll('tr').forEach( (tr, i) => {
        name = tr.getAttribute('data-name');
        tonsPerYear = parseInt(tr.getAttribute('data-tons'), 10);
        osunyTonsPerYear = parseInt(tr.getAttribute('data-tons-with-osuny'), 10);

        if (!name) return;

        tons.push({
            label: name,
            legend: false,
            data: [tonsPerYear, osunyTonsPerYear],
            backgroundColor: i % 2 === 0 ? 'white' : 'grey',
            stack: 'tons',
            fill: true,
            order: 1
        });
    });

    new Chart(document.getElementById('chart'), {
        type: 'bar',
        data: {
            labels: ['Tonnes eq CO2 sans Osuny', 'Tonnes eq CO2 avec Osuny'],
            datasets: tons
        },
        options: {
            indexAxis: 'y',
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                x: {
                    stacked: true
                },
                y: {
                    stacked: true
                }
            }
        }
    });
};
