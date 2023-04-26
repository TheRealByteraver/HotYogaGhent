// const data = [
//   [
//     "Start at",
//     "Mon",
//     "Tue",
//     "Wed",
//     "Thu",
//     "Fri",
//     "Sat",
//     "Sun",
//   ],
//   ["10:00", "Hot 90", "", "Hot 90", "", "", "", "Hot 90"],
//   ["12:15", "", "", "", "", "Hot 60", "Hot 60", ""],
//   ["17:00", "", "", "", "", "", "", "Hot 90"],
//   ["18:15", "Hot 90", "Hot 90", "Hot 90", "Hot 90", "", "", ""],
//   ["19:00", "", "", "", "", "Hot 60", "", ""],
//   ["20:15", "Hot 60", "Absolute + Yin 90 min", "Hot 90", "Hot 90", "", "", ""],
// ];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Table(props: any) {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          {props.title && (
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              {props.title}
            </h1>
          )}
          {props.description && (
            <p className="mt-2 text-sm text-gray-700">{props.description}</p>
          )}
        </div>
      </div>
      <div className="-mx-4 mt-10 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              {props.data[0].map((header: string, index: number) => (
                <th
                  key={header}
                  scope="col"
                  className={classNames(
                    index === 0
                      ? "py-3.5 pl-4 pr-3 sm:pl-6"
                      : " px-3 py-3.5 lg:table-cell",
                    "text-left text-sm font-semibold text-gray-900"
                  )}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {props.data.map((row: any, rowIndex: number) => {
              if (rowIndex === 0) return null; // skip table head
              return (
                <tr key={row[0]}>
                  {
                    row.map((entry: string, entryIndex: number) => (
                      <td key={`${rowIndex * 10 + entryIndex}`}
                        className="border">
                        <div className="font-medium text-gray-900">
                          {entry}
                        </div>
                        {rowIndex !== 0 ? (
                          <div className="absolute -top-px left-6 right-0 h-px bg-gray-200" />
                        ) : null}
                      </td>
                    ))
                  }
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
