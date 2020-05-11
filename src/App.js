import React, {useState} from 'react';
import './App.scss';
import Compose from "./components/compose";

const App = () => {
  const [content, setContent] = useState('');

  const handleContentChange = (content) => setContent(content);

  return (
    <div className="App">
      <Compose onChange={handleContentChange} value={content}/>
    </div>
  );
}

export default App;
