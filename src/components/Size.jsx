import { Modal } from "antd";
import { useState } from "react";

const Size = ({ size, data, setData }) => {
  const [modal, setModal] = useState(false);
  let sizes = Object.entries(size);

  console.log(sizes);

  return (
    <div className="product_size">
      <Modal
        open={modal}
        footer={false}
        onCancel={() => {
          setModal(false);
        }}
        width={700}
      >
        <div className="size_chart_title mt_32">SIZE CHART</div>
        <table className="size_table">
          <tr>
            <th></th>
            <th>CHEST</th>
            <th>LENGTH</th>
            <th>SHOULDER</th>
            <th>SLEEVE</th>
          </tr>
          <tr>
            <td>S</td>
            <td>38</td>
            <td>26</td>
            <td>17</td>
            <td>25</td>
          </tr>
          <tr>
            <td>M</td>
            <td>40</td>
            <td>27</td>
            <td>18</td>
            <td>25</td>
          </tr>
          <tr>
            <td>L</td>
            <td>42</td>
            <td>28</td>
            <td>19</td>
            <td>25</td>
          </tr>
          <tr>
            <td>XL</td>
            <td>44</td>
            <td>29</td>
            <td>19</td>
            <td>26</td>
          </tr>
          <tr>
            <td>XXL</td>
            <td>46</td>
            <td>29</td>
            <td>20</td>
            <td>26</td>
          </tr>
        </table>

        <p
          style={{ textAlign: "center", marginTop: ".5rem", fontWeight: "600" }}
        >
          If your measurements fall between sizes, we suggest that you size up
          for a better fit.
        </p>
      </Modal>
      <p className="select_size">Select a size</p>
      <div className="product_size_btn">
        {sizes.map(([size, count]) => {
          return (
            <SizeButton
              size={size}
              count={count}
              key={size}
              data={data}
              setData={setData}
            />
          );
        })}
      </div>

      <div className="size_chart mt_32">
        <button
          onClick={() => {
            setModal(true);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            data-inject-url="https://cdn.kiwisizing.com/icons/tape2.min.svg?v=5-inject2"
            class="kiwi-svg kiwi-injectable"
            crossorigin="Anonymous"
          >
            <path d="M193.65 156.647c-36.028 0-62.835 14.83-65.2 36.06a26.85 26.85 0 0 0-.165 2.964c0 21.366 24.68 37.366 60.02 38.9 1.787.078 3.583.117 5.337.117 37.87 0 65.357-16.413 65.357-39.026s-27.487-39.026-65.357-39.026zm0 46.707c-1.302 0-2.638-.03-3.97-.088-15.277-.668-24.74-4.874-28.58-7.608 4.4-3.133 15.725-7.663 32.552-7.663 16.856 0 28.204 4.547 32.577 7.68-4.373 3.133-15.72 7.68-32.577 7.68zm193.65 60.303v-67.982c0-28.763-21.7-54.808-61.135-73.338-35.657-16.76-82.72-25.992-132.515-25.992-48.057 0-93.907 8.675-129.104 24.428-38.388 17.18-61.2 41.593-64.202 68.744-.228 2.055-.344 4.127-.344 6.157v120.65c0 27.153 19.62 52.17 55.243 70.442 31.905 16.365 74.893 26.488 121.046 28.505a400.35 400.35 0 0 0 17.361.383H512V263.657H387.3zM31.5 192.974c3.498-31.527 69.5-65.282 162.15-65.282 95.648 0 162.303 35.828 162.303 67.983s-66.655 67.982-162.303 67.982a367.32 367.32 0 0 1-15.993-.354l-7.185-.39c-35.193-2.26-68.22-9.7-93.66-21.2l-2.615-1.208-.26-.124-2.178-1.05-1.235-.62-1.18-.596-1.73-.906-.388-.205c-21.34-11.434-34.124-25.26-35.7-38.54-.016-.135-.025-.27-.04-.404l-.086-.964a24.1 24.1 0 0 1-.045-1.42c.001-.88.052-1.8.153-2.7zm324.454 58.083v12.6H336.7c7.143-3.935 13.567-8.15 19.263-12.6zm124.7 133.25h-32.9v-41.32h-31.347v41.32h-38.86V317.56H346.2v66.746h-38.113v-41.32H276.75v41.32h-38.862V317.56H206.54v66.746h-12.9a369.21 369.21 0 0 1-15.993-.353l-9.23-.527v-40.44H137.08V379.8c-13.785-2.275-26.847-5.377-38.86-9.236v-66.4H66.873v53.3c-22.62-12.202-35.527-27.096-35.527-41.14v-65.242c4.296 3.35 9.026 6.56 14.15 9.626l.17.104 1.964 1.145 1.95 1.114 1.56.863 3.025 1.614.758.398.318.167L59.038 268l.565.27 4.306 2 .08.034 5.153 2.237 1.013.423 4.62 1.852 2.15.82 2.396.885c22.23 8.13 47.548 13.707 74.746 16.464l1.228.125 3.547.335 5.203.428 2.04.146 6.285.393c.086.004.17.01.256.016l1.028.56h307v89.308z"></path>
          </svg>
          SIZE CHART
        </button>
      </div>
    </div>
  );
};

export default Size;

const SizeButton = ({ size, count, data, setData }) => {
  return (
    <button
      className={`size_btn ${
        count === 0
          ? "disabled"
          : data?.selected_size === size
          ? "selected"
          : ""
      }`}
      onClick={() => {
        if (count === 0) return;

        setData({ ...data, selected_size: size });
      }}
    >
      {size}
    </button>
  );
};
