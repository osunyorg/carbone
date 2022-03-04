import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const labels = [],
    tonsWith = [],
    tonsWithout = [],
    tonsSaved = [];
let index = 0;

for (let row of data.rows) {
    if (index > 0) {
        labels.push(row.cells[0].innerText);
        tonsWith.push(row.cells[1].innerText);
        tonsWithout.push(row.cells[2].innerText);
        tonsSaved.push(row.cells[3].innerText);
    }
    index += 1;
};

new Chart(document.getElementById('chart'), {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: 'Tonnes eq CO2 avec Osuny',
            backgroundColor: 'white',
            data: tonsWithout,
            fill: true,
            order: 1
        }, {
            label: 'Tonnes eq CO2 économisables',
            backgroundColor: 'green',
            data: tonsSaved,
            fill: true,
            order: 2
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
