import React, { useEffect, useState } from "react";
import { Search } from "./Search";
import { Video } from "./Video";

export const App = () => {
  const baseUrl =
    "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.youtube.com%2Ffeeds%2Fvideos.xml%3Fchannel_id%3D";
  const [videos, setVideos] = useState([]);
  const [currentChannelId, setCurrentChannelId] = useState();
  const [channelName, setChannelName] = useState("");
  const [searchError, setSearchError] = useState("");

  useEffect(() => {
    (async () => {
      if (currentChannelId) {
        try {
          const data = await fetch(`${baseUrl}${currentChannelId}`).then(
            (response) => response.json()
          );

          if (!data.items) {
            throw new Error();
          }

          setVideos(data.items);
          setChannelName(data.items[0].author);
          setSearchError("");
        } catch (err) {
          console.log(err);
          setSearchError("Could not retrive videos");
        }
      }
    })();
  }, [currentChannelId]);

  return (
    <div className="app-container">
      <h1>Latest Youtube Videos</h1>
      <Search setCurrentChannelId={(id) => setCurrentChannelId(id)} />

      <div className="search_errors">{searchError}</div>
      {channelName && <h2>Videos from {channelName}</h2>}
      <div className="videos">
        {videos.map((video) => (
          <Video key={video.guid} video={video}></Video>
        ))}
      </div>
    </div>
  );
};
