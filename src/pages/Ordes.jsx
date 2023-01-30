import axios from "axios";
import React, { useState } from "react";
import Card from "../components/Card";

function Orders() {
	const [orders, setOrders] = useState([]);
const [isLoading, setIsLoading] = useState(true);


React.useEffect(() => {
(	async() => {
	try {
		const {data} = await axios.get('https://635902faff3d7bddb9967d80.mockapi.io/orders');
		setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
		setIsLoading(false);
	} catch (error) {
		alert('Ошибка при запросе заказов')
		console.log(error);
	}
})();
}, []);

	return (
		<div className="content p-40">
		<div className="mb-40 d-flex align-center justify-between">
			<h1>Мои заказы</h1>
		</div>
	
		<div className="headphones flex-wrap mb-30">
		{(orders.map((item, index) => (
						<Card key={index} loading={isLoading} {...item}/>
		)))}
		</div>
	</div>
	)
}

export default Orders;