import { Button, Upload } from "antd";
import axios from "axios";
import { useState } from "react";

const CreateProduct = () => {
  const [fileList, setFileList] = useState([]);

  const send = async () => {
    const formdata = new FormData();

    let tags = [
        "Artsy White Oversized T-Shirt",
        "Oversized",
        "White",
        "t-shirts",
      ],
      size = {
        S: 10,
        M: 10,
        L: 10,
        XL: 10,
        XXL: 10,
      };
    formdata.append("name", "Artsy White Oversized T-Shirt");
    tags.map((tag) => {
      formdata.append("tags", tag);
    });
    formdata.append("price", 999);
    formdata.append("type", "t-shirts");

    Object.entries(size).map(([key, value]) => {
      formdata.append(`size[${key}]`, Number(value));
    });

    formdata.append(
      "description",
      "Stay ahead of the trends in this oversized Artsy White Oversized T-Shirt. The unique reflecting print and bold graphic print will make this your go-to weekend style. Stylish and comfortable, you'll be wearing it all season."
    );
    formdata.append("total", 50);

    fileList.forEach((image) => {
      formdata.append("images", image);
    });

    await axios
      .post(`http://localhost:5555/api/product/create`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data", // Important: set the content type
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Upload
        name="file"
        beforeUpload={(file) => {
          return true;
        }}
        fileList={fileList}
        customRequest={({ file, onSuccess, onError }) => {
          setTimeout(() => {
            onSuccess();
            console.log(file, "file");

            // Update component state with file information
            setFileList((prevFileList) => [...prevFileList, file]);
          }, 1000);
        }}
        onRemove={(file) => {
          setFileList((prevFileList) =>
            prevFileList.filter((item) => item.uid !== file.uid)
          );
        }}
      >
        {" "}
        <Button>Click to Upload</Button>
      </Upload>{" "}
      <button onClick={send}>dffdf</button>
    </div>
  );
};

export default CreateProduct;
