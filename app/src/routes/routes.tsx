import { Route, Routes } from 'react-router-dom';
import { AppContainer } from '../components/layout/AppContainer';
import Editor from '../pages/Editor';
import Frontpage from '../pages/Frontpage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AppContainer />}>
        <Route path="/" element={<Frontpage />} />
        <Route path="/editor" element={<Editor />} />
      </Route>
    </Routes>
  );
};
