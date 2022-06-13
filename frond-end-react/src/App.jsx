import { Routes, Route } from 'react-router-dom';

import { LoginPage, FeedPage, ProfilePage } from './pages'

function App() {

  return (
    
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/feed" element={<FeedPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
}

export default App;