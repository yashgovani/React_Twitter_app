import { Search } from '@material-ui/icons';
import React from 'react';
import './Widgets.css';
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterTweetEmbed,
  TwitterHashtagButton,
} from 'react-twitter-embed';

const Widgets = () => {
  return (
    <div className="widgets">
      <div className="widgets__input">
        <Search className="widgets__searchIcon" />
        <input placeholder="Search Twitter" type="text" />
      </div>
      <div className="widgets__widgetContainer">
        <h2>What's happening</h2>
        <TwitterTweetEmbed tweetId={'858551177860055040'} />
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="latimes"
          options={{ height: 400 }}
        />
        <TwitterHashtagButton tag={'cybersecurity'} />
        <TwitterShareButton
          url={'https://www.facebook.com/yash.govani.75'}
          options={{ text: '#reactjs is awesome', via: 'latimes' }}
        />
      </div>
    </div>
  );
};

export default Widgets;
