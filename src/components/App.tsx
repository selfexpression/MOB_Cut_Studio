import React from 'react';
import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';

import { pageRoutes } from '../utils/routes';

import { Navbar } from './Navbar';
import { Slider } from './Main/Slider';
import { Services } from './Main/Services';
import { Video } from './Main/Video';
// import Team from './Team';
import { Footer } from './Main/Footer';
import { Header } from './Main/Header';
import { BookingWidget } from './Main/BookingWidget';

const Main = () => (
  <>
    <Header />
    <Video />
    <Services />
    <Slider />
    <Footer />
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
