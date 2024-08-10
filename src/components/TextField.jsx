import { Input } from "antd";
import React from "react";

const TextField = ({
  name = "",
  label = "",
  error = false,
  value = "",
  onChange,
  width,
  placeholder = "",
  readonly,
  addonAfter,
  bordered = true,
}) => {
  return (
    <div className="textfield">
      <label htmlFor={name}>{label}</label>

      <div>
        <Input
          style={{ width: width }}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readonly}
          addonAfter={addonAfter}
          bordered={bordered}
        />
        {error ? <p></p> : ""}
      </div>
    </div>
  );
};

export default TextField;
