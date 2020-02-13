import React from "react";
import cx from "classnames";

import "./list.css";

const List = ({ data = [], selectedShapeName, setSelectedShapeName }) => {
  return (
    <div id={"items"}>
      {data.map((item, i) => {
        if (!item.id || !item.name) {
          return null;
        }

        return (
          <Item
            key={item.id}
            data={item}
            isSelected={item.name === selectedShapeName}
            onClick={setSelectedShapeName}
          />
        );
      })}
    </div>
  );
};

export default List;

const Item = ({ data, isSelected, onClick }) => {
  const { name, stroke } = data;

  return (
    <div
      className={cx("item", { selected: isSelected })}
      onClick={() => onClick(name)}
    >
      <span style={{ color: stroke }}>{name}</span>
    </div>
  );
};
