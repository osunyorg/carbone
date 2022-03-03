import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const table = document.querySelector('.table'),
    period = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    tonsPerMonth = parseFloat(table.getAttribute('data-tons-per-month')),
    tonsPerMonthWithOsuny = parseFloat(table.getAttribute('data-tons-per-month-with-osuny')),
    tons = [],
    osunyTons = [],
    cumulate = (increment, array) => {
        const value = array.length === 0 ? 0 : array[array.length -1];
        return value + increment;
    };

let chartData;

period.forEach(() => {
    tons.push(cumulate(tonsPerMonth, tons));
    osunyTons.push(cumulate(tonsPerMonthWithOsuny, osunyTons));
});

chartData = {
    labels: period,
    datasets: [{
        label: 'Tons without Osuny',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        fill: true,
        data: tons,
        order: 2
    },{
        label: 'Tons with Osuny',
        backgroundColor: 'rgb(99, 99, 132)',
        borderColor: 'rgb(99, 99, 132)',
        data: osunyTons,
        fill: true,
        order: 1
    }]
};

new Chart(document.getElementById('chart'), {
    type: 'bar',
    data: chartData,
    options: {
        maintainAspectRatio: false
    }
});
