import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const table = document.querySelector('.table'),
    period = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    tonsPerMonth = parseFloat(table.getAttribute('data-tons-per-month')),
    tonsPerMonthWithOsuny = parseFloat(table.getAttribute('data-tons-per-month-with-osuny')),
    tons = [],
    osunyTons = [],
    savedTons = [],
    cumulate = (increment, array) => {
        const value = array.length === 0 ? 0 : array[array.length -1];
        return value + increment;
    };

let chartData;

period.forEach(() => {
    tons.push(cumulate(tonsPerMonth, tons));
    osunyTons.push(cumulate(tonsPerMonthWithOsuny, osunyTons));
    savedTons.push(cumulate(tonsPerMonth - tonsPerMonthWithOsuny, savedTons));
});

chartData = {
    labels: period,
    datasets: [{
        label: 'Tons without Osuny',
        backgroundColor: 'orange',
        borderColor: 'orange',
        // fill: true,
        data: tons,
        stack: 'without'
    }, {
        label: 'Tons with Osuny',
        backgroundColor: 'white',
        borderColor: 'white',
        data: osunyTons,
        type: 'bar',
        // fill: true,
        stack: 'osuny'
    }, {
        label: 'Tons saved with Osuny',
        backgroundColor: 'green',
        data: savedTons,
        fill: true,
        stack: 'osuny',
        type: 'bar'
    }]
};

new Chart(document.getElementById('chart'), {
    type: 'line',
    data: chartData,
    options: {
        maintainAspectRatio: false,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true
            }
        }
    }
});
