export default function Table({ headers = [], data = [], renderRow }) {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={headers.length} className="text-center text-muted">
                Nenhum dado encontrado
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={index}>
                {renderRow(item, index)}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}