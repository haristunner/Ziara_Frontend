import React from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { message } from "antd";

const Quantity = ({ size, data, setData }) => {
  return (
    <div className="quantity mt_32">
      <button
        className="quantity_btn"
        disabled={!data?.selected_size}
        onClick={() => {
          if (data?.quantity == 1) return;
          setData({ ...data, quantity: data?.quantity - 1 });
        }}
      >
        <RemoveIcon />
      </button>
      <span>{data?.quantity}</span>
      <button
        className="quantity_btn"
        disabled={!data?.selected_size}
        onClick={() => {
          if (data?.quantity + 1 > data?.size[data?.selected_size]) {
            message.error("Dont have more product for this size");
            return;
          }

          setData({ ...data, quantity: data?.quantity + 1 });
        }}
      >
        <AddIcon />
      </button>
    </div>
  );
};

export default Quantity;
