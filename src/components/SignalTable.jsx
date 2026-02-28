export default function SignalTable({ rows }) {
  return (
    <table className="signal-table">
      <thead>
        <tr>
          <th>Arquetipo</th>
          <th>Señales monitorizadas</th>
          <th>Canal sugerido</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.archetype}>
            <td>{row.archetype}</td>
            <td>{row.signals}</td>
            <td>{row.channel}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
