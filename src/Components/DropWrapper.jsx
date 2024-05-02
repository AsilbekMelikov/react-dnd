import React, { cloneElement } from "react";
import { statususes } from "../data/data";
import ITEM_TYPE from "../data/types";
import { useDrop } from "react-dnd";

const DropWrapper = ({ onDrop, children, status }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ITEM_TYPE,
    // canDrop: (item, monitor) => {
    //     const itemIndex = statususes.findIndex((si) => si.status === item.status);
    //     const statusIndex = statususes.findIndex((si) => si.status === status);
    //     return [itemIndex + 1, itemIndex - 1, itemIndex].includes(statusIndex);
    //   },
    drop: (item, monitor) => {
      onDrop(item, monitor, status);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} className={"drop-wrapper"}>
      {/* {children} */}
      {cloneElement(children, { isOver })}
    </div>
  );
};

export default DropWrapper;
