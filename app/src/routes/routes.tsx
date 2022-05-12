import { Route, Routes } from 'react-router-dom';
import { AppContainer } from '../components/layout/AppContainer';
import Frontpage from '../pages/Frontpage';
import { Main } from '../pages/Main';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AppContainer />}>
        <Route path="/" element={<Frontpage />} />
        <Route path="/editor" element={<Main />} />
      </Route>
    </Routes>
  );
};
