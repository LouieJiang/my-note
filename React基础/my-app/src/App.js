import './App.css';
import ClockClass from './components/clock-class';
import ClockFunction from './components/clock-function';
import ReactReduxPage from './components/ReactReduxPage';
import ReduxPage from './components/ReduxPage';


function App() {
  return (
    <div>
      <ClockClass />
      <ClockFunction />
      <ReduxPage />
      <ReactReduxPage />
    </div>
  );
}

export default App;
