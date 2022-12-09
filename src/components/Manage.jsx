import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Manage = (props) => {
    let len = props.notebook.categories.length;
    const labels = props.notebook.categories;
    const dataset = new Array(len).fill(0);
    props.transaction.forEach((pay, index) => {
        let ii = labels.indexOf(pay.category);
        dataset[ii] += parseInt(pay.amount);
    })
    const data = {
        labels: labels,
        datasets: [
            {
                label: '# of Votes',
                data: dataset,
                // [12, 19, 10, 3, 5, 2, 3, 12].slice(0, len),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(0, 0, 0, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 255, 255, 0.2)',
                ].slice(0, len),
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(0, 0, 0, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 255, 255, 1)',
                ].slice(0, len),
                borderWidth: 1,
            },
        ],
    };

    return (
        <>
            <h2 className="section__title">Doughnut</h2>
            <span className="section__subtitle less__margin__subtitle">Get details of current balance here</span>
            <div className="services__container container flexy">
                <Doughnut
                    height={300}
                    width={400}
                    data={data}
                    options={{
                        responsive: true
                    }}
                />
            </div>
        </>
    )
}

export default Manage;
