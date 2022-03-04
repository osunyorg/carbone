import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export const makeUniversitiesChart = function () {
    const table = document.querySelector('.table'),
        tons = [];
    let name,
        tonsPerYear,
        osunyTonsPerYear,
        tonsSaved = 0;

    table.querySelectorAll('tr').forEach((tr, i) => {
        name = tr.getAttribute('data-name');
        tonsPerYear = parseInt(tr.getAttribute('data-tons'), 10);
        osunyTonsPerYear = parseInt(tr.getAttribute('data-tons-with-osuny'), 10);
        if (!name) {
            return;
        }
        tonsSaved = tonsSaved + tonsPerYear - osunyTonsPerYear;

        tons.push({
            label: name,
            legend: false,
            data: [tonsPerYear, osunyTonsPerYear],
            backgroundColor: i % 2 === 0 ? 'rgb(255,255,255)' : 'rgb(225,225,225)',
            stack: 'tons',
            fill: true,
            order: 1
        });
    });

    tons.push({
        label: 'Gain de sobriété',
        legend: false,
        data: [0, tonsSaved],
        backgroundColor: '#55C461',
        stack: 'tons',
        fill: true,
        order: 1
    });

    new Chart(document.getElementById('chart'), {
        type: 'bar',
        data: {
            labels: ['Tonnes eq CO2 des sites existants', 'Tonnes eq CO2 avec Osuny'],
            datasets: tons
        },
        options: {
            indexAxis: 'y',
            maintainAspectRatio: false,
            responsive: true,
            padding: 0,
            scales: {
                x: {
                    stacked: true
                },
                y: {
                    stacked: true,
                    ticks: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
};
