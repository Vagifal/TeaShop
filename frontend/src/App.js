import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import { DataProvider } from './MainState'
import Header from './components/header/Header'
import Pages from './components/pages/Pages'

const App = () => {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header />
          <Pages />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
