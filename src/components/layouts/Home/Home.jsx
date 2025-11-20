import "./home.css";
import bell from "../../../../public/images/bell-7.png";
import avatar from "../../../../public/images/ellipse-2-8.svg";
import designImg1 from "../../../../public/images/ellipse-4-58.svg";
import designImg2 from "../../../../public/images/ellipse-5-59.svg";
import designImg3 from "../../../../public/images/ellipse-6-60.svg";
import image1 from "../../../../public/images/image0-1-62.png";
import node1 from "../../../../public/images/node-61.png";
import node2 from "../../../../public/images/node-63.png";
import rightArrow from "../../../../public/images/vector-20.svg";
import check from "../../../../public/images/vector-34.svg";
import plusIcon from "../../../../public/images/vector-66.svg";
import AddTask from "../../lists/addTask.jsx";
import TodoList from "../../lists/TodoList.jsx";
import TotalCompleteItems from "../../lists/TotalCompleteItems.jsx";

function Home() {
  return (
    <div
      className="home-page"
      style={{ backgroundColor: " rgba(95, 59, 255, 1)" }}
    >
      {/* Header */}
      <header className="header">
        <img src={avatar} alt="avatar" className="avatar" />
        <div className="user-info">
          <p className="username">oussama chahidi</p>
          <p className="email">oussamachahidi@gmail.com</p>
        </div>
        <div className="bell-container">
          <img src={bell} alt="bell" className="bell" />
          <span className="notif">2</span>
        </div>
      </header>

      {/* Group Tasks */}
      <section className="section">
        <h3>Group tasks</h3>
        <div className="task-row">
          <div className="task-card white">
            <p className="task-title">Design Meeting</p>
            <p className="task-time">Tomorrow | 10:30pm</p>
            <div className="avatars">
              <img src={designImg1} alt="" />
              <img src={designImg2} alt="" />
              <img src={designImg3} alt="" />
              <img src={node1} alt="" />
              <img src={image1} alt="" />
              <img src={node2} alt="" />
              <img src={plusIcon} alt="" />
            </div>
          </div>

          <div className="task-card white">
            <p className="task-title">Projects Meeting</p>
            <p className="task-time">Thursday | 10:30pm</p>
            <div className="avatars">
              <img src={designImg1} alt="" />
              <img src={designImg2} alt="" />
              <img src={designImg3} alt="" />
            </div>
          </div>
        </div>
      </section>
      <AddTask />
      <TodoList />
      <TotalCompleteItems />
      {/* Incomplete Tasks */}
      <section className="section">
        <h3>Incomplete Tasks</h3>
        <div className="task-list">
          <div className="task-card blue">
            <div>
              <p className="task-title">Client meeting</p>
              <p className="task-time">Tomorrow | 10:30pm</p>
            </div>
            <img src={rightArrow} alt=">" className="arrow" />
          </div>
          <div className="task-card blue">
            <div>
              <p className="task-title">Client meeting</p>
              <p className="task-time">Tomorrow | 10:30pm</p>
            </div>
            <img src={rightArrow} alt=">" className="arrow" />
          </div>
        </div>
      </section>

      {/* Completed Tasks */}
      <section className="section">
        <h3>Completed Tasks</h3>
        <div className="task-list">
          <div className="task-card green">
            <img src={check} alt="done" className="check" />
            <div>
              <p className="task-title">Client meeting</p>
              <p className="task-time">Tomorrow | 10:30pm</p>
            </div>
            <img src={rightArrow} alt=">" className="arrow" />
          </div>
          <div className="task-card green">
            <img src={check} alt="done" className="check" />
            <div>
              <p className="task-title">Client meeting</p>
              <p className="task-time">Tomorrow | 10:30pm</p>
            </div>
            <img src={rightArrow} alt=">" className="arrow" />
          </div>
        </div>
      </section>

      {/* Tabs Bar */}
      <footer className="tabs-bar">
        <div className="tab"></div>
        <div className="tab"></div>
        <div className="tab"></div>
      </footer>
    </div>
  );
}

export default Home;
