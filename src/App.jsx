import { useEffect, useState } from 'react';
import './App.css';
import Iframe from './components/iframe/Iframe';
import Dropdown from './components/dropdown/Dropdown';
import cache from "../.cache?raw";

function App() {
  const [iframeData, setIframeData] = useState(undefined);
  const [battles, _] = useState(JSON.parse(cache));
  const [edition, setEdition] = useState("");
  const [battle, setBattle] = useState("");

  const loadResource = async (newEdition, newNum) => {
    let e;
    let n;
    if (edition !== newEdition) {
      e = newEdition;
      n = battles.battles[newEdition][0];
    } else {
      e = edition;
      n = newNum;
    }

    await import (`./battles/${e}/${n}/index.html`)
      .then(r => {
        setIframeData(r.default);
        setEdition(e);
        setBattle(n);
      });
  };

  useEffect(() => {
    const value = Object.keys(battles.battles)[0];
    const num = battles.battles[value];
    loadResource(value, num);
    setEdition(value);
    setBattle(num);
  }, []);

  return (
    <div>
      <h1>Css Battles so far</h1>
      <Dropdown
        name="battles"
        label="Select a battle edition"
        list={Object.keys(battles.battles)}
        selectedValue={edition}
        onChange={(e) => {
          loadResource(e.target.value, battle);
        }}
      ></Dropdown>

      <Dropdown
        name="battle"
        label="Select battle"
        list={battles.battles[edition] ?? []}
        selectedValue={battle}
        onChange={(e) => {
          loadResource(edition, e.target.value);
        }}
      ></Dropdown>
      <Iframe url={iframeData}></Iframe>
    </div>
  );
}

export default App
