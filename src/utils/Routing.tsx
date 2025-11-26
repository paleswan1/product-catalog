import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';

// const BaseLayout = () => {
//   return (
//     <div className="bg-background/95">
//       <Navbar />
//       <main className="">
//         <Outlet />
//       </main>
//       <Footer />
//     </div>
//   );
// };

const Routing = () => {
  return (
    <Router>
      <Routes></Routes>
    </Router>
  );
};

export default Routing;
