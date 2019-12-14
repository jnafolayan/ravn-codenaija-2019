import React, { useContext, useState, useEffect } from "react";
import moment from "moment";
import styled from "styled-components";
import { ThemeContext } from "../contexts/ThemeContext";
import { NewsContext } from "../contexts/NewsContext";

const Wrapper = styled.div`
  position: absolute;
  height: 70%;
  width: 100%;
  z-index: 2;
  top: 30%;
  background: ${({ theme }) => theme.bg};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;

  display: grid;
  grid-template-rows: 50px auto;

  .header {
    display: flex;
    align-items: center;

    > h3 {
      flex: 1;
      color: #fff;
      padding: 16px 18px;
      text-align: center;
      font-size: 18px;
      font-family: Poppins, sans-serif;
      background: ${({ theme }) => theme.bg};
      transition: all 0.3s;
    
      &:nth-child(1) {
        border-top-left-radius: 8px;
      }

      &:nth-child(2) {
        border-top-right-radius: 8px;
      }

      &:not(.active) {
        background: #777;
      }

      &:hover {
        cursor: pointer;
      }
    }
  }

  .body {
    background: ${({ theme }) => theme.bg};
    padding: 12px 18px;
    overflow-y: auto;
    position: relative;

    &::-webkit-scrollbar {
      width: 12px;
    }

    &::-webkit-scrollbar-track {
      background: rgb(25,25,25);
    }

    &::-webkit-scrollbar-thumb {
      background: rgb(80,80,80);
      border-radius: 12px;
    }

    .card {
      width: 100%;
      border-radius: 8px;
      background: rgba(100,100,100,1);
      padding: 12px;
      box-shadow: 0 4px 18px rgba(70,70,70,0.6);
      margin-top: 16px;

      &:hover {
        cursor: pointer;
      }

      .card-top {
        display: flex;
        justify-content: space-between;
        font-family: "Open Sans", sans-serif;
        font-size: 12px;
        font-weight: bold;
        color: #ccc;

        > span:first-child {
          color: hsl(40, 90%, 52%);
        }
      }

      .card-body {
        font-family: "Open Sans", sans-serif;
        font-size: 16px;
        color: #fff;
        text-transform: uppercase;
        padding: 12px 0;
      }

      .card-bottom {
        font-family: "Open Sans", sans-serif;
        font-size: 12px;
        font-weight: bold;
        color: #ccc;

        > span {
          margin-right: 16px;
        }
      }
    }
  }
`;

export default function Drawer() {
  const { state: theme } = useContext(ThemeContext);
  const { state: news, dispatch: newsDispatch } = useContext(NewsContext);
  const [tabs, updateTabs] = useState({ nearbyTab: "active", trendingTab: "" });
  const [firstLoad, setFirstLoad] = useState(true);

  const openTab = ({ target }) => {
    updateTabs({
      [target.id]: "active",
      [target.id == "nearbyTab" ? "trendingTab" : "nearbyTab"]: ""
    });
    target.parentNode.nextSibling.scrollTop = 0;
  };

  useEffect(() => {
    if (!firstLoad) return;

    const date = (delta) => {
      const d = new Date();
      d.setMinutes(d.getMinutes() - Math.floor(Math.random() * 10));
      return d;
    };

    newsDispatch({
      type: "LOAD",
      payload: {
        user: { location: [21, 43.03] },
        reports: [{
          _id: Math.random(),
          headline: "Gunmen take 4 hostage. Police trying to maintain order around",
          views: Math.floor(Math.random() * 100),
          location: [21, 43.01],
          place: "4th, Allen Avenue",
          date: date()
        }, {
          _id: Math.random(),
          headline: "Gunmen take 4 hostage. Police trying to maintain order around",
          views: Math.floor(Math.random() * 100),
          location: [21.02, 43.01],
          place: "4th, Allen Avenue",
          date: date()
        },{
          _id: Math.random(),
          headline: "Gunmen take 4 hostage. Police trying to maintain order around",
          views: Math.floor(Math.random() * 100),
          location: [50.4, 43],
          place: "4th, Allen Avenue",
          date: date()
        },{
          _id: Math.random(),
          headline: "Gunmen take 4 hostage. Police trying to maintain order around",
          views: Math.floor(Math.random() * 100),
          location: [21, 43.01],
          place: "4th, Allen Avenue",
          date: date()
        }, {
          _id: Math.random(),
          headline: "Gunmen take 4 hostage. Police trying to maintain order around",
          views: Math.floor(Math.random() * 100),
          location: [21.02, 43.01],
          place: "4th, Allen Avenue",
          date: date()
        },{
          _id: Math.random(),
          headline: "Gunmen take 4 hostage. Police trying to maintain order around",
          views: Math.floor(Math.random() * 100),
          location: [50.4, 43],
          place: "4th, Allen Avenue",
          date: date()
        }]
      }
    });
    setFirstLoad(false);
    setInterval(() => newsDispatch({ 
      type: "SYNC", 
      payload: { 
        user: { location: [21, 43.03] } 
      }
    }), 10000);
  }, [firstLoad]);

  return (
    <Wrapper theme={theme}>
      <header className="header">
        <h3 className={tabs.nearbyTab} id="nearbyTab" onClick={openTab}>Nearby</h3>
        <h3 className={tabs.trendingTab} id="trendingTab" onClick={openTab}>Trending</h3>
      </header>
      <div className="body">
        {tabs.nearbyTab ? 
          news.nearby.map(report => (
            <div key={report._id} className="card">
              <div className="card-top">
                <span><i className="fa fa-walking"></i>&nbsp;&nbsp;{report.feetAway} ft away</span>
                <span>{moment(report.date).fromNow()}</span>
              </div>
              <div className="card-body">
                {report.headline}
              </div>
              <div className="card-bottom">
                <span><i className="fa fa-map-pin"></i>&nbsp;&nbsp;{report.place}</span>
              </div>
            </div>
          )) : news.trending.map(report => (
            <div key={report._id} className="card">
              <div className="card-top">
                <span><i className="fa fa-map-pin"></i>&nbsp;&nbsp;{report.place}</span>
                <span>{moment(report.date).fromNow()}</span>
              </div>
              <div className="card-body">
                {report.headline}
              </div>
              <div className="card-bottom">
                <span><i className="fa fa-eye"></i>&nbsp;&nbsp;{report.views}</span>
                <span>
                  <i className="fa fa-comments"></i>
                  &nbsp;&nbsp;{report.comments ? report.comments.length : Math.floor(Math.random() * 100)}
                </span>
              </div>
            </div>
          ))
        }
      </div>
    </Wrapper>
  );
}
