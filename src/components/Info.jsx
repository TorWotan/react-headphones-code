import React from "react";
import AppContext from "../context";

export const Info = ({title, description, image}) => { 
const {setCartOpened} = React.useContext(AppContext);

	return (
		<div>
				<div className="cartEmpty d-flex align-center justify-center flex-column flex">
				<img
					className="mb-10"
					width="120px"
					src={image}
					alt="Empty"
				/>
				<h2>{title}</h2>
				<p className="opacity-6">
					{description}
				</p>
				<button className="greenButton" onClick={() => setCartOpened(false)}>
					Вернуться назад
					<img className="arrow_left" src="/img/arrow.svg" alt="Arrow" />
				</button>
			</div>
		</div>
	);
};

export default Info;