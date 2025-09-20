import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainPage from './MainPage'
import UserDetailsPage from './UserDetailsPage'
import PortfolioBuilder from './PortfolioBuilder'
import PreviousProjectsPage from './PreviousProjectsPage'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/user-details" element={<UserDetailsPage />} />
          <Route path="/portfolio-builder" element={<PortfolioBuilder />} />
          <Route path="/previous-projects" element={<PreviousProjectsPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
