import { useEffect, useState } from 'react';
import './App.css';
import Iframe from './components/iframe/Iframe';
import Dropdown from './components/dropdown/Dropdown';

function App() {
  const [count, setCount] = useState(undefined);
  const [editions, setEditions] = useState([]);
  const [battles, setBattles] = useState([]);

  const [edition, setEdition] = useState("");
  const [battle, setBattle] = useState("");

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
    <div>
      <h1>Css Battles so far</h1>
      <Dropdown
        name="battles"
        label="Select a battle edition"
        list={editions}
        selectedValue={edition}
      ></Dropdown>

      <Dropdown
        name="battle"
        label="Select battle"
        list={battles}
        selectedValue={battle}
      ></Dropdown>
      <Iframe url={count}></Iframe>
    </div>
  );
}

export default App
