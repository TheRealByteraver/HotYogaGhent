
const PriceTable = ({ priceTable }: any) => {
  const cellStyle = "p-1 md:p-3 border-b border-emerald-500 ";

  return (
    <div className="border border-emerald-500 w-fit rounded-xl overflow-hidden shadow-lg shadow-teal-900 bg-gradient-to-b from-blue-500 to-purple-800">
      <table className="text-white text-left font-semibold">
        <thead>
          <tr>
            <th className={cellStyle + " bg-emerald-500"}>Membership level</th>
            <th className={cellStyle + " bg-emerald-500"}>Price</th>
          </tr>
        </thead>
        <tbody>
          {priceTable.map((membershipLevel: any, index: number) => {
            const lastRowMarkUp =
              index === priceTable.length - 1 ? "border-b-0" : "";
            return (
              <tr key={membershipLevel.description}>
                <td className={cellStyle + lastRowMarkUp}>
                  {membershipLevel.description}
                </td>
                <td
                  className={
                    cellStyle + lastRowMarkUp + " bg-white bg-opacity-10"
                  }
                >
                  {membershipLevel.price}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PriceTable;