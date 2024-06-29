import React, { useState } from "react";
import "../index.css";
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { isBefore, isSameDay, isAfter, format } from "date-fns";
import axios from "axios";

const BoardPets = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hoveredEndDate, setHoveredEndDate] = useState(null);
  const [bookedDates] = useState([
    new Date("2024-07-10"),
    new Date("2024-07-15"),
    new Date("2024-07-20"),
  ]);

  const HandleSubmit = async (e) => {
    e.preventDefault();

    let res = await axios.post("http://localhost:3000/payment");

    console.log(res);
    if (res && res.data) {
      let link = res.data.links[1].href;
      window.location.href = link;
    }
  };

  const isBooked = (date) => {
    return bookedDates.some((booked) => isSameDay(booked, date));
  };

  const handleDateChange = (date, setter) => {
    if (!isBefore(date, new Date()) && !isBooked(date)) {
      setter(date);
    }
  };

  const handleEndDateChange = (date) => {
    if (isBefore(date, startDate)) {
      alert("End date cannot be before start date.");
      return;
    }

    if (!isBefore(date, new Date())) {
      const blockedDateInRange = bookedDates.find(
        (booked) => isAfter(booked, startDate) && isBefore(booked, date)
      );

      if (!blockedDateInRange) {
        setEndDate(date);
      } else {
        alert("End date cannot be set due to a booked date in between.");
      }
    }
  };

  const handleDayHover = (date) => {
    if (!startDate) return;
    const blockedDateInRange = bookedDates.find(
      (booked) => isAfter(booked, startDate) && isBefore(booked, date)
    );

    if (blockedDateInRange) {
      setHoveredEndDate(date);
    } else {
      setHoveredEndDate(null);
    }
  };

  const CustomDay = ({ day, date }) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    const isBookedDay = isBooked(date);
    const isBlockedRange =
      hoveredEndDate &&
      isAfter(date, startDate) &&
      isBefore(date, hoveredEndDate);

    return (
      <div
        className={`react-datepicker__day ${isBookedDay ? "booked-date" : ""} ${
          isBlockedRange ? "blocked-range" : ""
        }`}
        onMouseEnter={() => handleDayHover(date)}
        onClick={() => handleEndDateChange(date)}
      >
        {day}
      </div>
    );
  };

  const CalendarContainerComponent = ({ children }) => {
    return (
      <CalendarContainer className="react-datepicker">
        {children}
      </CalendarContainer>
    );
  };

  return (
    <div className="outermost bg-custom-gradient">
      <div className="main-outer">
        <header>
          <h1 id="title" className="text-center">
            Board your pet at <b>Purrfect Stay Boarding</b>
          </h1>
        </header>
        <form id="survey-form">
          <fieldset>
            <label id="name_and_surname-label" htmlFor="name_and_surname">
              Pet name:
            </label>
            <input
              id="name_and_surname"
              type="text"
              placeholder="Your answer"
              required
              className="form-control"
            />
          </fieldset>
          <fieldset>
            <label id="phone_number-label" htmlFor="phone_number">
              Pet Owner Name:
            </label>
            <input
              id="phone_number"
              type="text"
              placeholder="Your answer"
              required
              className="form-control"
            />
          </fieldset>
          <fieldset className="dateSelector">
            <div>
              <label htmlFor="startDate" id="date">
                Start Date:
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => handleDateChange(date, setStartDate)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                filterDate={(date) =>
                  !isBooked(date) && !isBefore(date, new Date())
                }
                dateFormat="dd/MM/yyyy"
                placeholderText="Select start date"
                className="form-control"
                required
                highlightDates={bookedDates.map((date) => ({
                  date,
                  className: "booked-date",
                }))}
              />
            </div>
            <div>
              <label htmlFor="endDate" id="date">
                End Date:
              </label>
              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                filterDate={(date) =>
                  !isBooked(date) && !isBefore(date, new Date())
                }
                dateFormat="dd/MM/yyyy"
                placeholderText="Select end date"
                className="form-control"
                required
                calendarContainer={CalendarContainerComponent}
                renderDayContents={(day, date) => (
                  <CustomDay day={day} date={date} />
                )}
                highlightDates={bookedDates.map((date) => ({
                  date,
                  className: "booked-date",
                }))}
              />
            </div>
          </fieldset>
          <fieldset>
            <p className="pform">Do you have any additional requirements?</p>
            <textarea
              id="comments"
              name="comments"
              placeholder="Your answer"
              className="input-textarea"
            ></textarea>
          </fieldset>
          <fieldset>
            <button
              type="submit"
              id="submit"
              className="submit-button"
              onClick={HandleSubmit}
            >
              Submit
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default BoardPets;
