import React from 'react';
import Card from "../components/Card";

function Home({items, onAddToCart, onAddToFavorite, isLoading, setSearchValue, searchValue, onChangeSearchInput}) {

const renderItems = () => {
	return (isLoading ? [...Array(8)] : items.filter((item) => item.title.toLowerCase()
	.includes(searchValue.toLowerCase())))
	.map((item, index) => (
		<Card 
			key={index}
			{...item}
			onPlus={(obj) => onAddToCart(obj)}
			onFavorite={(obj) => onAddToFavorite(obj)}
			loading={isLoading}
		/>
		))
}
	return (
		<div className="content p-40">
		<div className="mb-40 d-flex align-center justify-between">
			<h1>
			{searchValue ? `Поиск по: ${searchValue}` : "Все кроссовки"}
			</h1>
			<div className="search-block">
				{searchValue ?
				<img onClick={() => setSearchValue('')} src="/img/search.svg" alt="Search" /> : null}
				<input
				value={searchValue}
				onChange={onChangeSearchInput}
					type="text"
					placeholder="Поиск"
				/>
			</div>
		</div>

		<div className="headphones flex-wrap mb-30">
		{renderItems()}
		</div>
	</div>
	)
}

export default Home;