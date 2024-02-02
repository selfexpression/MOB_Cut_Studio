import React from 'react';
import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';

import { pageRoutes } from '../utils/routes';

import { Navbar } from './Navbar';
// import Slider from './Slider';
// import Services from './Services';
// import Video from './Video';
// import Team from './Team';
// import Footer from './Footer';
import { Header } from './Main/Header';
import { BookingWidget } from './Main/BookingWidget';

const Main = () => (
  <>
    <Header />
    {/* <Video />
    <Services />
    <Carousel />
    <Footer /> */}
    <BookingWidget />
  </>
);

export const App: React.FC = () => (
  <Router>
    <div className="d-flex flex-column">
      <Navbar />
      <Routes>
        <Route path={pageRoutes.mainPage()} element={<Main />} />
        {/* <Route path={routes.teamPage} element={<Team />} /> */}
      </Routes>
    </div>
  </Router>
);
