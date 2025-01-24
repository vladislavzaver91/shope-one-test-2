import { Chart, registerables } from 'chart.js'
import { Line } from 'react-chartjs-2'
Chart.register(...registerables)

const SalesAnalytics = () => {
	const chartData = {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
		datasets: [
			{
				label: 'Monthly Sales',
				data: [120, 190, 300, 500, 200, 300],
				borderColor: 'rgb(75, 192, 192)',
				backgroundColor: 'rgba(75, 192, 192, 0.2)',
				fill: true,
			},
		],
	}

	return (
		<div className='bg-white p-4 rounded-lg shadow-md'>
			<h2 className='text-xl font-semibold mb-4'>Sales Analytics</h2>
			<Line data={chartData} />
		</div>
	)
}

export default SalesAnalytics
