import React from 'react';
import Chart from 'react-apexcharts';

const DashboardAreaChart = () => {
  const options = {
    chart: {
      type: 'area',
      toolbar: { show: false },
      // fontFamily: 'Plus Jakarta Sans, sans-serif',
    },
    colors: ['#2D3748'],
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0.8,
        opacityFrom: 0.6,
        opacityTo: 0.8,
        stops: [10, 100, 100]
      }
    },
    dataLabels: { enabled: false },
    grid: {
      show: true,
      borderColor: '#fff',
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisBorder: { show: true },
      axisTicks: { show: true },
    },
    yaxis: {
      show: true,
      tickAmount: 3,
      min: 0,
      max: 300,
      
    },
    tooltip: {
      enabled: true,
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        return (
          '<div style="background: #1a1a1a; color: #fff; padding: 8px 12px; border-radius: 8px; font-size: 14px; font-weight: bold; border: none;">' +
          '<span>' + series[seriesIndex][dataPointIndex] + '£</span>' +
          '</div>'
        );
      },
      fixed: {
        enabled: false,
      },
      x: { show: false },
      y: { title: { formatter: () => '' } },
      marker: { show: false },
    },
  };

  const series = [{
    name: 'Sales',
    data: [80, 70, 50, 90, 180, 250, 220]
  }];

  return (
    <div className=" px-6 rounded-3xl ">

      {/* chart title */}
      <div className='flex items-center justify-between'>
        <h3 className='text-[20px] font-bold text-slate-800'>Sales Statistics</h3>
        <select className='bg-transparent  text-sm font-semibold outline-none cursor-pointer'>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      {/* chart */}
      <Chart
        options={options}
        series={series}
        type="area"
        height={350}
      />
    </div>
  );
};

export default DashboardAreaChart;