function Iframe({ url }) {
  return (
    <section id="iframe">
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