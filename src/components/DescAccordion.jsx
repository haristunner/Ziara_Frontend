import { Collapse } from "antd";
import React from "react";

const DescAccordion = ({ desc = "" }) => {
  return (
    <div className="mt_32">
      <Collapse
        style={{ textAlign: "left" }}
        items={[
          {
            key: 1,
            label: <strong>Description</strong>,
            children: <p>{desc}</p>,
            showArrow: false,
          },
          {
            key: 2,
            label: <strong>More Information</strong>,
            children: (
              <>
                <p className="mb_16">
                  <strong>Wash Care:</strong> Normal machine wash, do not dry on
                  direct sunlight
                </p>
                <p>
                  <strong>Note :</strong> The actual colour of the product may
                  vary slightly due to photographic lighting sources or your
                  device.
                </p>
              </>
            ),
            showArrow: false,
          },
          {
            key: 3,
            label: <strong>Returns and Exchange</strong>,
            children: (
              <ol style={{ paddingLeft: "1rem" }}>
                <li className="mb_8">
                  Returns and exchanges are accepted within 2 days of receiving
                  your order.
                </li>
                <li className="mb_8">
                  Items must be unworn, unwashed, and in their original
                  condition with tags attached.
                </li>
                <li className="mb_8">
                  Once approved, securely package your items with the Order Id
                  clearly marked on the package and ship it back to us.
                </li>
                <li className="mb_8">
                  Customers are responsible for return shipping costs.
                </li>
                <li>
                  If you return the product, you can exchange it or get a
                  replacement. Refunds are not available, but we will give you a
                  gift card for the purchase amount instead. You can use the
                  gift card to order at any time, and it is valid for a
                  lifetime.
                </li>
              </ol>
            ),
            showArrow: false,
          },
        ]}
      />
    </div>
  );
};

export default DescAccordion;
