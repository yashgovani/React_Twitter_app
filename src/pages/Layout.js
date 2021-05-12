import React from 'react';
import Feed from '../component/Feed/Feed';
import Sidebar from '../component/Sidebar/Sidebar';
import Widgets from '../component/Widgets/Widgets';
import './Layout.css';

const Layout = () => {
  return (
    <div className="app">
      <Sidebar />
      <Feed />
      <Widgets />
    </div>
  );
};

export default Layout;
