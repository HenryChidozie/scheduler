//Component that shows list of days and remaining spots in the sidebar
import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const dayChecker = props.days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        id={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}
      />
    );
  });

  return(
    <ul>{ dayChecker }</ul>
  );
};