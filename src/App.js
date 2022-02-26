import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import "./App.css";

function App() {
  const [state, setState] = useState([]);
  const [page, setPage] = useState(1);
  const [loadItem, setLoad] = useState(10);
  const fetchMoreData = () => {
    setTimeout(() => {
      setLoad((pervious) => pervious + 10);
      setPage((perPage) => perPage + 1);
    }, 1000);
  };
  useEffect(() => {
    // async function demo() {
    //   // const URL =
    //   //   "https://api.seatgeek.com/2/events?client_id=MjQ1OTk2ODB8MTYzNzczNDkzNy45MDAwMjE&page=1&per_page=10";
    //   const Res = fetch(
    //     "https://api.seatgeek.com/2/events?client_id=MjQ1OTk2ODB8MTYzNzczNDkzNy45MDAwMjE&page=1&per_page=10"
    //   );
    //   console.log(Res);
    //   const response = await Res;
    //   console.log(response);
    //   const json = await response.json();
    //   console.log(json);
    //   //console.log(json.events);
    // }
    // demo();

    axios(
      `https://api.seatgeek.com/2/events?client_id=MjQ1OTk2ODB8MTYzNzczNDkzNy45MDAwMjE&page=${page}&per_page=${loadItem}`
    ).then((res) => {
      setState(res.data.events);
    });
  }, [loadItem]);
  return (
    <>
      <div className="App">
        <InfiniteScroll
          dataLength={state.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {state.map((getDt, index) => {
            return (
              <div className="recordData" key={index}>
                <span>Index: {index} </span>
                <div>Type: {getDt.type} </div>
                <div>Id: {getDt.id} </div>
                <div>DataTime: {getDt.datetime_utc} </div>
                <div>Title: {getDt.title}</div>
                <div>Popularity: {getDt.popularity}</div>
                <div>
                  Url:<a href={getDt.url}>{getDt.url}</a>
                </div>
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
    </>
  );
}

export default App;
