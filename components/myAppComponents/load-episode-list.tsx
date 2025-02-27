"use client"

import xml2js from "xml2js";
import { useState } from "react";

const LoadEpisodeList = ({ handleMediaChange }) => {
  const [episodes, setEpisodes] = useState([]);
  let [rssFeedUrl, setRssFeedUrl] = useState("");
  
  const fetchPodcastData = async () => {
    if(rssFeedUrl && rssFeedUrl !== "") { 
    const response = await fetch(rssFeedUrl); // Your feed URL here
    const xmlData = await response.text();
    const episodesList = await parseXML(xmlData);
    setEpisodes(episodesList);
    console.log(episodesList);  
    }
  };

  const parseXML = async (xmlData) => {
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(xmlData);

    // Extract the list of items (episodes) from the feed
    const episodes = result.rss.channel[0].item.map((episode) => ({
      title: episode.title[0],
      description: episode.description[0],
      // link: episode.link[0],
      audioUrl: episode.enclosure[0].$.url, // Extract the audio URL
      pubDate: episode.pubDate[0],
    }));

    return episodes;
  };

  // https://feeds.megaphone.fm/MSC1713576256
  return (
    <div>
      <div className="p-4">
        <p>Load XML Feed URL: </p>
        <input
          type="text"
          id="rssFeedUrl"
          onChange={(e) => setRssFeedUrl(e.target.value)}
          value={rssFeedUrl}
          className="border p-1"
        />
        <button
          onClick={fetchPodcastData}
          className="ml-2 px-2 py-1 border rounded"
        >
          Load
        </button>
      </div>

      <ul className="space-y-4">
        {episodes.map((episode, index) => (
          <li key={index} className="border p-4 rounded-md shadow-md">
            <h2 className="text-xl font-semibold">{episode.title}</h2>
            {/* <p className="text-sm text-gray-600">{episode.description}</p> */}
            {/* <audio controls>
              <source src={episode.audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio> */}
            <p className="text-xs text-gray-400">{new Date(episode.pubDate).toLocaleDateString()}</p>
            <button
              onClick={() => {
                console.log("Error in LoadEpisodeList.tsx: ", episode.audioUrl);
                handleMediaChange(episode.audioUrl)
                
                }}>
              Load Episode
            </button>
            
            <a href={episode.audioUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 mt-2 block">
              Listen on Website
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoadEpisodeList;