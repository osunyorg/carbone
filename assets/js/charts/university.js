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
        label: 'Sans Osuny',
        backgroundColor: 'white',
        data: tons
    }, {
        label: 'Avec Osuny',
        backgroundColor: 'red',
        data: osunyTons
    }]
};

new Chart(document.getElementById('chart'), {
    type: 'bar',
    data: chartData,
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
