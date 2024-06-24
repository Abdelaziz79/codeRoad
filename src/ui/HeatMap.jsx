import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";

import "react-calendar-heatmap/dist/styles.css";

const today = new Date();
export default function HeatMap() {
  const randomValues = getRange(365).map((index) => {
    return {
      date: shiftDate(today, -index),
      count: getRandomInt(1, 3),
    };
  });
  return (
    <div>
      <CalendarHeatmap
        startDate={shiftDate(today, -365)}
        endDate={today}
        values={randomValues}
        classForValue={(value) => {
          if (!value) {
            return "color-empty";
          }
          return `color-github-${value.count}`;
        }}
        showWeekdayLabels={true}
        onClick={(value) =>
          alert(`Clicked on value with count: ${value.count}`)
        }
      />
    </div>
  );
}
function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

function getRange(count) {
  return Array.from({ length: count }, (_, i) => i);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
