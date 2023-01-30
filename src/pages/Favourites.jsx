import React from "react";
import Card from "../components/Card";
import AppContext from "../context";

function Favourites() {
	const {onAddToFavorite, favourites} = React.useContext(AppContext);
	console.log(onAddToFavorite);
	return (
		<div className="content p-40">
		<div className="mb-40 d-flex align-center justify-between">
			<h1>Мои закладки</h1>
		</div>
		
		<div className="headphones flex-wrap mb-30">
			{favourites.map(((item, index) => (
				<Card key={index} {...item} onFavorite={onAddToFavorite} favorited={true}/>
			)))}
		</div>
	</div>
	)
}

export default Favourites;