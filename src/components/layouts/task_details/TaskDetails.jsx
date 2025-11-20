import React from "react";
import "./task_details.css";

import calendar from "../../../../public/images/calendar-5.png";
import home from "../../../../public/images/home-7.png";
import line2 from "../../../../public/images/line-2-10.svg";
import line3 from "../../../../public/images/line-3-21.svg";
import pinImg from "../../../../public/images/pin-32.png";
import settings from "../../../../public/images/settings-6.png";
import todoList from "../../../../public/images/todo-list-8.png";

import vector3 from "../../../../public/images/vector-3.svg";
import vector15 from "../../../../public/images/vector-15.svg";
import vector17 from "../../../../public/images/vector-17.svg";
import vector19 from "../../../../public/images/vector-19.svg";
import vector26 from "../../../../public/images/vector-26.svg";
import vector28 from "../../../../public/images/vector-28.svg";

function TaskDetails() {
  return (
    <div className="task-details-root">
      <header className="td-header">
        <button type="submit" className="back-btn" aria-label="Back">
          <img src={vector3} alt="back" />
        </button>
        <div className="td-title-group">
          <h1 className="td-task-title">team meeting</h1>
          <h2 className="td-subtitle">Task Details</h2>
          <div className="td-time">
            <img src={vector15} alt="clock" className="td-time-icon" />
            <span>Today | 20:00pm</span>
          </div>
        </div>
        <div className="td-actions">
          <button type="submit" className="icon-btn" aria-label="Calendar">
            <img src={vector17} alt="calendar" />
          </button>
          <button type="submit" className="icon-btn" aria-label="Edit">
            <img src={vector19} alt="edit" />
          </button>
        </div>
      </header>

      <main className="td-body">
        <p className="td-description">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>

        <img src={line3} alt="divider" className="td-divider" />

        <div className="td-actions-row">
          <button type="submit" className="td-action-card done">
            <img src={vector26} alt="done" />
            <span>Done</span>
          </button>

          <button type="submit" className="td-action-card delete">
            <img src={vector28} alt="delete" />
            <span>Delete</span>
          </button>

          <button type="submit" className="td-action-card pin">
            <img src={pinImg} alt="pin" />
            <span>Pin</span>
          </button>
        </div>
      </main>

      <nav className="td-bottom-nav" aria-label="Main navigation">
        <button type="submit" className="nav-btn">
          <img src={home} alt="home" />
        </button>
        <button type="submit" className="nav-btn">
          <img src={todoList} alt="list" />
        </button>
        <button type="submit" className="nav-btn active">
          <img src={calendar} alt="calendar" />
          <img src={line2} alt="active" className="active-line" />
        </button>
        <button type="submit" className="nav-btn">
          <img src={settings} alt="settings" />
        </button>
      </nav>
    </div>
  );
}

export default TaskDetails;
