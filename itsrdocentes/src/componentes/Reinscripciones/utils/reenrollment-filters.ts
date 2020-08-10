import {AvailableSubject, AvailableSubjectTime} from '../interfaces';
import {areIntervalsOverlapping} from 'date-fns';

const isSelectedSameSubject = (subjects: AvailableSubject[], data: AvailableSubject) => {
  const {subject, tableData} = data;

  return subjects
    .filter(value => value.subject.clave === subject.clave)
    .some(value => value?.tableData?.checked &&
      value.subject.clave === subject.clave &&
      value.tableData?.id !== tableData.id);
}

const isTimeCrossings = (subjects: AvailableSubject[], data: AvailableSubject) => {
  const {
    tableData,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday
  } = data;

  const isCrossing = subjects.some(
    value => {
      return value.tableData?.id !== tableData.id &&
        value.tableData?.checked &&
        !tableData.checked &&
        (
          isOverlapping(monday, value.monday) ||
          isOverlapping(tuesday, value.tuesday) ||
          isOverlapping(wednesday, value.wednesday) ||
          isOverlapping(thursday, value.thursday) ||
          isOverlapping(friday, value.friday) ||
          isOverlapping(saturday, value.saturday) ||
          isOverlapping(sunday, value.sunday)
        )
    }
  );
  return isCrossing;
}


const isOverlapping = (start: AvailableSubjectTime | undefined, end: AvailableSubjectTime | undefined) => {
  if (!start || !end) {
    return false;
  }

  const leftInterval = {
    start: +start.startTime.substring(0, 2),
    end: +start.endTime.substring(0, 2),
  }

  const rightInterval = {
    start: +end.startTime.substring(0, 2),
    end: +end.endTime.substring(0, 2),
  }

  return areIntervalsOverlapping(
    {
      start: new Date().setHours( leftInterval.start),
      end: new Date().setHours(leftInterval.end),
    },
    {
      start: new Date().setHours( rightInterval.start),
      end: new Date().setHours(rightInterval.end),
    }
  )
};

export {
  isSelectedSameSubject,
  isTimeCrossings
}
