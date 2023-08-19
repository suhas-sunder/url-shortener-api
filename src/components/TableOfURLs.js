function TableOfURLs({ handleCopy, handleDeleteURL, links }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <td>Original</td>
          <td>Short</td>
          <td></td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {links.map((link) => (
          <tr key={link.id}>
            <td>{link.original}</td>
            <td>{link.short}</td>
            <td>
              <button className="btn" onClick={() => handleCopy(link.short)}>
                Copy
              </button>
            </td>
            <td>
              <button className="btn" onClick={() => handleDeleteURL(link.id)}>
                X
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableOfURLs;
