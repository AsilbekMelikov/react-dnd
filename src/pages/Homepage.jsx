import { useState } from "react";
import Col from "../Components/Col";
import DropWrapper from "../Components/DropWrapper";
import Item from "../Components/Item";
import { data, statususes } from "../data/data";

const Homepage = () => {
  const [items, setItems] = useState(data);

  const onDrop = (item, monitor, status) => {
    const mapping = statususes.find((si) => si.status === status);

    setItems((prevState) =>
      prevState
        .filter((i) => i.id !== item.id)
        .concat({ ...item, status, icon: mapping.icon })
    );
    // setItems((prevState) => {
    //   const newItems = prevState
    //     .filter((i) => i.id !== item.id)
    //     .concat({ ...item, status, icon: mapping.icon });
    //   return [...newItems];
    // });
  };

  const moveItem = (dragIndex, hoverIndex) => {
    const item = items[dragIndex];

    setItems((prevState) => {
      const newItems = prevState.filter((i, idx) => idx !== dragIndex);
      newItems.splice(hoverIndex, 0, item);
      return [...newItems];
    });
  };

  return (
    <div className={"row"}>
      {statususes.map((s) => {
        return (
          <div key={s.status} className={"col-wrapper"}>
            <h2 className={"col-header"}>{s.status.toUpperCase()}</h2>
            <DropWrapper onDrop={onDrop} status={s.status}>
              <Col>
                {items
                  .filter((i) => i.status === s.status)
                  .map((i, idx) => (
                    <Item
                      key={i.id}
                      item={i}
                      index={idx}
                      moveItem={moveItem}
                      status={s}
                    />
                  ))}
              </Col>
            </DropWrapper>
          </div>
        );
      })}
    </div>
  );
};

export default Homepage;
