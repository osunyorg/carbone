// // import { 
// //     Chart, 
// //     LineElement,
// //     PointElement,
// //     LineController,
// //     CategoryScale,
// //     LinearScale
// // } from 'chart.js';

// // Chart.register(
// //     LineElement,
// //     PointElement,
// //     LineController,
// //     CategoryScale,
// //     LinearScale
// // );
// import { Chart, registerables } from 'chart.js';
// Chart.register(...registerables);

// const table = document.querySelector('.table'),
//     data = {
//         period: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
//         universities: []
//     };

// table.querySelectorAll('tr').forEach(tr => {
//     const values = JSON.parse(tr.getAttribute('data-values'));
//     if (values) {
//         data.universities.push(values[0]);
//     }
// });

// console.log(data);

// const chartData = {
//     labels: data.period,
//     datasets: [{
//         label: 'My First dataset',
//         backgroundColor: 'rgb(255, 99, 132)',
//         borderColor: 'rgb(255, 99, 132)',
//         data: data.universities
//     }]
// };

// const config = {
//     type: 'line',
//     data: chartData,
//     options: {}
// };

// const chart = new Chart(
//     document.getElementById('chart'), config
// );