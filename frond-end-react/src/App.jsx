import { Routes, Route } from 'react-router-dom';

import { LoginPage, FeedPage } from './pages'

function App() {

  return (
    
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/feed" element={<FeedPage />} />
    </Routes>
  );
}

export default App;