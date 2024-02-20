import React from 'react';
import './App.css';
import Form from './components/Form';

function App() {
  return (
    <main className="max-w-[1440px] mx-auto w-full overflow-hidden p-3 md:p-0">
      <Form />
      <div className="attribution text-center text-xs">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge" rel='noreferrer' target="_blank">Frontend Mentor</a>.
        Coded by <a href="https://www.frontendmentor.io?ref=challenge" rel="noreferrer" target='_blank'>Ahtesham</a>.
      </div>
    </main>
  );
}

export default App;
