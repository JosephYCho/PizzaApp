import React from "react";

const mapToppingAnimation = ({ toppings }) => {
  const mapToppingAnimation = toppings.map(topping =>
    topping.isSauce ? (
      <img src={topping.toppingImage} alt="topping" className={`sauce-img`} />
    ) : (
      <div className="topping-container">
        <img
          key={`${topping.name}-${topping.id}`}
          src={topping.toppingImage}
          alt="topping"
          className={`topping-img ${topping.name}`}
        />
        <img
          key={`${topping.name}-${topping.id + 1}`}
          src={topping.toppingImage}
          alt="topping"
          className={`topping-img ${topping.name}`}
        />
        <img
          key={`${topping.name}-${topping.id + 2}`}
          src={topping.toppingImage}
          alt="topping"
          className={`topping-img ${topping.name}`}
        />
      </div>
    )
  );
  return mapToppingAnimation;
};

export default React.memo(mapToppingAnimation);
