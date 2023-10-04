function Iframe({ url }) {
  return (
    <section>
      <p>Css battles, pe site, au un container de 400x300</p>
      <small>
        <i>Iframe are 410x310</i>
      </small>
      <iframe
        src={url}
        width="410"
        height="310"
        style={{ display: 'block'}}
      ></iframe>
    </section>
  );
}

export default Iframe;