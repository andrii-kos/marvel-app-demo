import './App.scss';

import {lazy, Suspense} from 'react';
import { BrowserRouter as Router , Routes, Route} from 'react-router-dom'; 
import Spinner from '../spinner/Spinner';

const MainPage = lazy(() => import('../pages/MainPage'))
const ComicsPage = lazy(() => import('../pages/ComicsPage'))
const ComicPage = lazy(() => import('../pages/ComicPage'))
const AppHeader = lazy(() => import('../appHeader/AppHeader'))
const ErrorMessage = lazy(() => import('../errorMessage/ErrorMessage'))

const App = () => {
    return (
      <Router>
        <div className="app">
          <AppHeader />
          <Suspense fallback={<Spinner />}>
            <main>
              <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/comics' element={<ComicsPage />} />
                <Route path="/comics/:comicId" element={<ComicPage />} />
                <Route path="*" element={<ErrorMessage />} />
              </Routes>
            </main>
          </Suspense>
      </div>
      </Router>
    );
}

export default App;
