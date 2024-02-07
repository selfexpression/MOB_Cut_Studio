import React, {
  type ReactNode,
  useState,
  useEffect,
} from 'react';
import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';
import { getAuth, signInAnonymously } from 'firebase/auth';

import { pageRoutes } from '../utils/routes';
import { AuthContext } from '../contexts';

import { Navbar } from './Navbar';
import { Slider } from './Main/Slider';
import { Services } from './Main/Services';
import { Video } from './Main/Video';
import { Team } from './Main/Team';
import { Footer } from './Main/Footer';
import { Header } from './Main/Header';
import { BookingWidget } from './Main/BookingWidget';
import { Store } from './Store/Main';
import { ProductCard } from './Store/ProductCard';
import { Cart } from './Store/Cart';
import { CartLoader } from './Store/CartLoader';

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [currentUserUID, setCurrentUserUID] = useState('');

  useEffect(() => {
    const authUser = async () => {
      const auth = getAuth();
      const anonymousUser = await signInAnonymously(auth);
      const { uid } = anonymousUser.user;
      setCurrentUserUID(uid);
    };

    authUser();
  }, [currentUserUID]);

  return (
    <AuthContext.Provider value={currentUserUID}>
      {children}
    </AuthContext.Provider>
  );
};

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
  <AuthContextProvider>
    <Router>
      <div className="d-flex flex-column">
        <Navbar />
        <CartLoader />
        <Routes>
          <Route path={pageRoutes.mainPage()} element={<Main />} />
          <Route path={pageRoutes.storePage()} element={<Store />} />
          <Route path={pageRoutes.productPage()} element={<ProductCard />} />
          <Route path={pageRoutes.teamPage()} element={<Team />} />
          <Route path={pageRoutes.cartPage()} element={<Cart />} />
        </Routes>
      </div>
    </Router>
  </AuthContextProvider>
);
