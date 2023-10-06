function Code({ title, content}) {
  return (
    <section className="code">
      <h5>{title}</h5>

      <pre>
        <code>
          {content}
        </code>
      </pre>
    </section>
  );
}

export default Code;