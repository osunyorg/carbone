import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

// import pSBC from './psbc';

export const makeUniversitiesChart = function () {
    const table = document.querySelector('.table'),
        tons = [],
        COLORS = {
            green: '#55C461',
            grey: 'rgb(225,225,225)',
            white: 'rgb(255,255,255)'
        };

    let name,
        tonsPerYear,
        osunyTonsPerYear,
        tonsSaved = 0,
        buttons,
        chart,
        actions;
        // totalTons = 0,
        // averageTons = 0;

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
            backgroundColor: i % 2 === 0 ? COLORS.white : COLORS.grey,
            stack: 'tons',
            fill: true,
            index: i,
            order: 1
        });

        // totalTons += tonsPerYear;
    });

    tons.push({
        label: 'Gain de sobriété',
        legend: false,
        data: [0, tonsSaved],
        backgroundColor: COLORS.green,
        stack: 'tons',
        fill: true,
        id: 'saved',
        order: 1
    });

    // Set impact color :
    // averageTons = totalTons / tons.length;

    // tons.forEach((data) => {
    //     let lighten = 1 - (data.data[0] / totalTons) * 20;
    //     data.backgroundColor = pSBC(lighten, '#DD3333');
    // });

    chart = new Chart(document.getElementById('chart'), {
        type: 'bar',
        data: {
            labels: ['Tonnes eq CO2 des sites existants', 'Tonnes eq CO2 avec Osuny'],
            datasets: tons
        },
        options: {
            indexAxis: 'y',
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                    max: 5000
                },
                y: {
                    stacked: true,
                    ticks: {
                        display: false
                    },
                    alignToPixels: true
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    // Handle actions
    buttons = document.querySelectorAll('[data-chart-action]');

    const resetColors = function () {
            chart.data.datasets.forEach((data, i) => {
                if (data.id !== 'saved') {
                    data.backgroundColor = i % 2 === 0 ? COLORS.white : COLORS.grey;
                }
            });
        },
        toggleButtons = function (action) {
            buttons.forEach((button) => {
                if (button.getAttribute('data-chart-action') === action) {
                    button.classList.add('d-none');
                } else {
                    button.classList.remove('d-none');
                }
            });
        };

    actions = {
        orderByTons: () => {
            chart.data.datasets.sort((a, b) => {
                return b.data[0] - a.data[0];
            });
            resetColors();
            toggleButtons('orderByTons');
            chart.update();
        },
        orderByName: () => {
            chart.data.datasets.sort((a, b) => {
                return a.index - b.index;
            });
            resetColors();
            toggleButtons('orderByName');
            chart.update();
        }
    };

    buttons.forEach((button) => {
        let action = button.getAttribute('data-chart-action');
        if (actions[action]) {
            button.addEventListener('click', actions[action]);
        }
    });

};
