import dynamic from 'next/dynamic';

const Chart =dynamic(()=>import('react-apexcharts'),{ssr:false})

export default function BarChart (){

    
    const state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: [9, 12, 2, 5, 9, 12, 3, 5]
        }
      },
      series: [
        {
          name: "series-1",
          data: [21, 25, 27, 23, 21, 18, 11, 14]
        }
      ]
    };

    return (

            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              width="500"
            />
    );
}