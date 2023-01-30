import React from "react";
import ContentLoader from "react-content-loader";
import AppContext from "../../context";

import styles from "./Card.module.scss";

function Card({
  id,
  title,
  price,
  imageUrl,
  design,
  emitterType,
  impedance,
  range,
  favorited = false,
  onPlus,
  onFavorite,
  loading = false,
}) {
  const { isItemAdded } = React.useContext(AppContext);
  const [isFavourite, setIsFavourite] = React.useState(favorited);
  const obj = {
    id,
    parentId: id,
    title,
    price,
    imageUrl,
    design,
    emitterType,
    impedance,
    range,
  };
  // console.log(id, isItemAdded(id));

  const onClickFavorites = () => {
    onFavorite(obj);
    setIsFavourite(!isFavourite);
  };

  const onClickPlus = () => {
    onPlus(obj);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={267}
          height={265}
          viewBox="0 0 267 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="3" y="7" rx="10" ry="10" width="266" height="155" />
          <rect x="0" y="166" rx="5" ry="5" width="121" height="15" />
          <rect x="0" y="186" rx="5" ry="5" width="265" height="39" />
          <rect x="230" y="231" rx="10" ry="10" width="25" height="25" />
          <rect x="0" y="235" rx="0" ry="0" width="80" height="25" />
        </ContentLoader>
      ) : (
        <>
          {onFavorite && (
            <div className={styles.favorite}>
              <img
                onClick={onClickFavorites}
                src={isFavourite ? "/img/like.svg" : "/img/noLike.svg"}
                alt="Unliked"
              />
            </div>
          )}

          <img width="100%" height="266px" src={imageUrl} alt="Headphones" />
          <h5 className="mt-10">{title}</h5>
          <h4>Конструкция: {design}</h4>
          <h4>Тип излучателей: {emitterType}</h4>
          <h4>Импеданс: {impedance}</h4>
          <h4>Диапазон воспроизводимых частот: {range}</h4>
          <div className="d-flex justify-between align-center mt-10">
            <div className="card_bottom">
              <span>Цена:</span>
              <br />
              <b>{price}</b>
            </div>
            <img
              onClick={onClickPlus}
              className="plus cu-p"
              src={
                isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"
              }
              alt="Plus"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
