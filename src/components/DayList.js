import React from "react";
import DayListItem from "./DayListItem";


export default function DayList(props) {

  //<DayList days={days) day={day} setDay={setDay />

  const dayListItems = (props.days || []).map((dayData, _index) => 
    <DayListItem
      key={dayData.id}
      name={dayData.name}
      spots={dayData.spots}
      selected={props.selectedDay === dayData.id}
      setDay={(_event) => props.setDay(dayData.id)}
    />
  );

  return(
    <ul>{dayListItems}</ul>
  );
}