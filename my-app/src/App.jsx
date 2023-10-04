import { useEffect, useState } from 'react';
import './App.css';


function App() {
  const [count, setCount] = useState(undefined);

  useEffect(() => {
    console.log("test");
    (async () => {
      await import ('./test/4. test/index.html')
        .then(r => {
          console.log(r);
          setCount(r.default);
        })
    })()
  });
  return (
    <>
      <iframe src={count} width={450} height={400}></iframe>
    </>
  )
}

export default App
