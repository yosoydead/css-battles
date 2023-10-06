import { useEffect, useState } from 'react';
import './App.css';
import Iframe from './components/iframe/Iframe';
import Dropdown from './components/dropdown/Dropdown';
import cache from "../.cache?raw";
import Code from './components/code/Code';

function App() {
  const [iframeData, setIframeData] = useState(undefined);
  const [battles, _] = useState(JSON.parse(cache));
  const [edition, setEdition] = useState("");
  const [battle, setBattle] = useState("");
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  
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

    const iframeSrc = await import (`./battles/${e}/${n}/index.html`);
    const html =  await import (`./battles/${e}/${n}/index.html?raw`);
    const css =  await import (`./battles/${e}/${n}/index.css?raw`);

    setEdition(e);
    setBattle(n);
    setIframeData(iframeSrc.default);
    setHtmlCode(html.default);
    setCssCode(css.default);
  };

  useEffect(() => {
    const value = Object.keys(battles.battles)[0];
    const num = battles.battles[value];
    loadResource(value, num);
    setEdition(value);
    setBattle(num);
  }, []);

  return (
    <section id="main">
      <h1>Css Battles so far</h1>
      <h3>Am depus 0 efort pentru stilizarea paginii! Tot ce vreau e să pot arăta soluțiile și atât.</h3>
      <p>Css battles nu are niciun folos în viața de zi cu zi. Sunt doar hack-uri și puțină ingeniozitate.</p>
      <small>Scorul soluțiilor e garantat >= 99%.</small>

      <section id="main__dropdowns">
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
      </section>
      
      <p>Css battles, pe site, au un container de 400x300</p>
      <small>
        <i>Iframe are 410x310</i>
      </small>
      <section id="main__showcase">
        <Iframe style={{ flexBasis: "100%" }} url={iframeData}></Iframe>

        <section id="main__showcase--code">
          <p>html | css</p>
          <label className="switch">
            <input
              type="checkbox"
              value={checkbox}
              checked={checkbox}
              onChange={(e) => {
                setCheckbox(e.target.checked)
              }}
            />
            <span className="slider"></span>
          </label>
          <Code
            title={checkbox ? "Css Code" : "Html Code"}
            content={checkbox ? cssCode : htmlCode}
          ></Code>
        </section>
      </section>
    </section>
  );
}

export default App
