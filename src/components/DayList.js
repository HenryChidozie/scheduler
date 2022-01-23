import React from "react";
import DayListItem from "./DayListItem";


export default function DayList(props) {

  const dayChecker = props.days.map((element) => {
    return (
      <DayListItem
        key={element.id}
        id={element.id}
        name={element.name}
        spots={element.spots}
        selected={element.name === props.day}
        setDay={props.setDay}
      />
    );
  });

  return(
    <ul>{ dayChecker }</ul>
  );
};