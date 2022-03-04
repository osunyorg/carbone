import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const table = document.querySelector('[data-tons-per-month]'),
    months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    date = new Date(),
    monthOffset = date.getMonth(),
    year = date.getYear() - 100,
    tonsPerMonth = parseFloat(table.getAttribute('data-tons-per-month')),
    tonsPerMonthWithOsuny = parseFloat(table.getAttribute('data-tons-per-month-with-osuny')),
    tons = [],
    osunyTons = [],
    savedTons = [],
    cumulate = (increment, array) => {
        const value = array.length === 0 ? 0 : array[array.length -1];
        return value + increment;
    };

let labels = months.map((m, i) => {
    let myear = year + Math.floor((i + monthOffset) / 12);

    tons.push(cumulate(tonsPerMonth, tons));
    osunyTons.push(cumulate(tonsPerMonthWithOsuny, osunyTons));
    savedTons.push(cumulate(tonsPerMonth - tonsPerMonthWithOsuny, savedTons));

    return months[(i + monthOffset) % 12] + ' ' + myear;
});

new Chart(document.getElementById('chart'), {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: 'Tonnes eq CO2 avec Osuny',
            backgroundColor: 'white',
            data: osunyTons,
            fill: true,
            stack: 'osuny',
            order: 1
        }, {
            label: 'Tonnes eq CO2 évitables',
            backgroundColor: '#55C461',
            data: savedTons,
            fill: true,
            stack: 'osuny',
            order: 2
        }
        // TODO : try to add toggle to see current tons projection without osuny
        // {
        //     label: 'Tonnes eq CO2 sans Osuny',
        //     backgroundColor: 'red',
        //     data: tons,
        //     fill: true,
        //     stack: 'without',
        //     order: 0
        // }
        ]
    },
    options: {
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
