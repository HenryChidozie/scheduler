import React from "react";
import "./DayListItem.scss";
const className = require("classnames");




export default function DayListItem(props) {
  const { name, spots, selected, setDay } = props;
  const dayClass = className("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": !spots
  });

  const formatSpots = function(spots) {
    let manySpots = "";
    if (spots > 1) {
      manySpots += "s"
      return `${spots} spot${manySpots} remaining`
    } else if (spots === 1) {
      return `${spots} spot${manySpots} remaining`
    } else {
      return "no spots remaining"
    }
    // return (
    //   !spots || (spots === 0)
    //   ? "no spots remaining"
    //   : `${spots} spot${spots === 1 ? "" : "s"} remaining`
    // );
  };

  return (
    <li
      className={dayClass}
      onClick={setDay}
    >
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}