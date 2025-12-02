import './App.css'
import { Header } from './components/Header';
import { Content } from './components/Content';
import { Total } from './components/Total';
import { courseParts } from './entities/Course';

const App = () => {
  const courseName = "Half Stack application development";

  return (
    <div style={{ textAlign: 'left' }}>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;