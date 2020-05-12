import React, {useState} from 'react';
import './App.scss';
import Compose from "./components/Compose";

const App = () => {
  const [content, setContent] = useState('');

  const addContent = (newContent) => {
    const updatedContent = content !== '' ? content + "<br/>" + newContent : newContent;

    setContent(updatedContent);
  };

  return (
    <div className="App">
      <Compose addText={addContent} text={content}/>
    </div>
  );
}

export default App;
