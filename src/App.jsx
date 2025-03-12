import React from 'react';
import JSONViewer from './pages/jsonviewer';

const App = () => {
  // Replace this URL with your own raw GitHub URL for data.json
  const jsonUrl = 'https://raw.githubusercontent.com/awales0177/catpages/main/data.json';

  return (
    <div className="App">
      <h1>My JSON Viewer App</h1>
      <JSONViewer url={jsonUrl} />
    </div>
  );
};

export default App;
