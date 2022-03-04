import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const labels = [],
    tons = [],
    savings = [];
let index = 0;

for (let row of data.rows) {
    if (index > 0) {
        labels.push(row.cells[0].innerText);
        let value = row.cells[2].innerText;
        if (value === '') {
            value = row.cells[1].innerText;
        }
        tons.push(value);
        savings.push(row.cells[3].innerText);
    }
    index += 1;
};

new Chart(document.getElementById('chart'), {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: 'Tonnes eq CO2 générées',
            backgroundColor: 'white',
            data: tons
        }, {
            label: 'Tonnes économisables avec Osuny',
            backgroundColor: 'red',
            data: savings
        }]
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
