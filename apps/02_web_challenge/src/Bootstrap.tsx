import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { SearchComponent } from './components/SearchComponent/SearchComponent';

export const BootStrap = () => {
  return (
    <>
      <Header />
      <SearchComponent />
      <Outlet />
    </>
  );
};
