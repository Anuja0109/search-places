import React from "react";
import "./List.css";

export default function List({ itemList = [], label = "", tableColumns = [] }) {
  return (
    <section aria-label="places-list">
      <h4>{label}</h4>
      <table id="basic-table" className="list-table">
        <thead className="table-head">
          <tr className="table-tr">
            {tableColumns.map(
              (col) =>
                !col.hidden && (
                  <th key={col.name} className="table-td">
                    {col.label}
                  </th>
                )
            )}
          </tr>
        </thead>
        <tbody className="table-body">
          {itemList?.length > 0 ? (
            itemList.map((item) => (
              <tr key={item.id} className="table-tr">
                {tableColumns.map((col) => {
                  console.log({ col, item, val: item?.[col.name] });
                  if (col.type === "textWithImage") {
                    return (
                      !col.hidden && (
                        <td
                          key={`${col.name}-${item?.[col.name]}`}
                          className="table-td"
                        >
                          {item?.[col.name] ?? ""}
                          <img
                            src={item?.imgSrc}
                            alt={`${item?.[col.name]}-flag-image`}
                            className="listImg"
                          />
                        </td>
                      )
                    );
                  }
                  return (
                    !col.hidden && (
                      <td
                        key={`${col.name}-${item?.[col.name]}`}
                        className="table-td"
                      >
                        {item?.[col.name] ?? ""}
                      </td>
                    )
                  );
                })}
              </tr>
            ))
          ) : (
            <tr key="no-data-row" className="table-tr text-center">
              <td
                className="text-center"
                colSpan={
                  tableColumns?.filter((col) => !col.hidden)?.length
                }
              >
                {" "}
                No items found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}
