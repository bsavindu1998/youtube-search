import React, { useEffect, useState } from "react";

export const App = () => {
  const baseUrl =
    "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.youtube.com%2Ffeeds%2Fvideos.xml%3Fchannel_id%3D";
  const [videos, setVideos] = useState([]);
  const [currentChannelId, setCurrentChannelId] = useState();
  const [channelID,setChannelId] = useState ('');
  const [channelName,setChannelName] = useState('');
  const [searchError,setSearchError]  = useState('');

  useEffect(() => {
    (async () => {
      if (currentChannelId){
        try{
          const data = await fetch(`${baseUrl}${currentChannelId}`).then(
            (response) => response.json()
          );

          if (!data.items){
            throw new Error();
          }

          setVideos(data.items);
          setChannelName(data.items[0].author);
          setSearchError('');
          console.log(data.items);
        }
        catch (err){
          console.log(err);
          setSearchError('Could not retrive videos');
        }
        
      }
      
    })();
  }, [currentChannelId]);

  return (
    <div className="app-container">
      <h1>Latest Youtube Videos</h1>
      <div className="search">
        <input type="text" onChange={event=>setChannelId(event.target.value)} placeholder="Enter channel ID"/>
        <button onClick={()=> setCurrentChannelId(channelID)}>Fetch Videos</button> 
      </div>

      <div className="search_errors">
        {searchError}
      </div>
      {channelName&&<h2>Videos from {channelName}</h2>}

      {videos.map((video) => (
        <div key={video.guid} className="videos__item">
          <div className="video__image">
            <a target="_blank" href={video.link}>
              <img
                src={`https://i4.ytimg.com/vi/${
                  video.guid.split(":")[2]
                }/mqdefault.jpg`}
              ></img>
            </a>
          </div>
          <div className="video__footer">
            <p>{video.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
