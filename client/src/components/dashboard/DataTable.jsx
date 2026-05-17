export default function DataTable({ title, columns, rows }) {
  return (
    <div className="rounded-3xl border border-white/8 bg-white/5 p-6 backdrop-blur-sm">
      {title && (
        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">{title}</p>
      )}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[320px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/8 text-xs uppercase tracking-wider text-muted">
              {columns.map((col) => (
                <th key={col} className="pb-3 pr-4 font-semibold">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-white/5 last:border-0">
                {row.cells.map((cell, i) => (
                  <td key={i} className="py-3 pr-4 text-white">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
