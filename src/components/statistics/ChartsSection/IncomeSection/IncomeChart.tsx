import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { IncomePerDayInterface, IncomePerMonthInterface } from '../../../../interfaces/StatisticsInterface';
import StatWrapper from '../../StatWrapper';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
);

interface Props {
  incomePerDay?: IncomePerDayInterface;
  incomePerMonth?: IncomePerMonthInterface;
  text: string;
  labels: string[];
}

const IncomeChart = ({ incomePerDay, incomePerMonth, text, labels }: Props) => {
  
  const dataSource = incomePerDay ? incomePerDay : incomePerMonth;

  const data = {
    labels,
    datasets: [
      {
        data: dataSource,
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
      }
    ],
  };
  
  const options = {
    responsive: true,
  };

    return (
      <StatWrapper>
        <h3 className="mb-10 font-semibold text-center">{text}</h3>
        <Bar options={options} data={data}/>
      </StatWrapper>
    )
}

export default IncomeChart;