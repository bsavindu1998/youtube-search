import { render } from "@testing-library/react";
import React, { useState } from "react";

export const Search = (props) => {
  const [channelID, setChannelId] = useState("");

  return(
    <div className="search">
      <input
        type="text"
        onChange={(event) => setChannelId(event.target.value)}
        placeholder="Enter channel ID"
      />
      <button onClick={() => props.setCurrentChannelId(channelID)}>
        Fetch Videos
      </button>
    </div>
  );
};
