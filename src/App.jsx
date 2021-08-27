
import './App.scss';
import SomeComponent from './someComponent'
function App() {
  const someText = 'props text for home work # 1'
  return (
    <div className="App">
        <SomeComponent
        text={someText}
        />
    </div>
  );
}

export default App;
