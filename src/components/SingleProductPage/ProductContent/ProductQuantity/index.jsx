import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";

const ProductQuantity = ({
  type,
  stock = 1,
  minStock = 1,
  initialQuantity = null,
  HandelChange,
  weightUnit = "g",
}) => {
  const { t } = useTranslation("product");

  const step = type === "unit" ? 1 : minStock;
  const [quantity, setQuantity] = useState(initialQuantity || step);
  const [showStockMessage, setShowStockMessage] = useState(false);

  // Round function to avoid floating-point issues
  const roundQty = (qty) => {
    if (type === "unit") return qty;
    return Number(qty.toFixed(3)); // round to 3 decimals for weight
  };

  // Reset quantity if stock/minStock/type changes
  useEffect(() => {
    let newQty = initialQuantity || step;

    if (type !== "unit") {
      newQty = Math.ceil(newQty / step) * step;
      newQty = roundQty(newQty);
    }

    if (newQty > stock) newQty = stock;
    setQuantity(newQty);
    HandelChange && HandelChange(newQty);
    setShowStockMessage(false);
  }, [stock, type, minStock, initialQuantity]);

  const increase = () => {
    let newQty = quantity + step;
    newQty = roundQty(newQty); // round to avoid floating-point errors

    if (newQty > stock) {
      newQty = stock;
      setShowStockMessage(true);
    } else {
      setShowStockMessage(false);
    }
    setQuantity(newQty);
    HandelChange && HandelChange(newQty);
  };

  const decrease = () => {
    let newQty = quantity - step;

    if (type !== "unit") {
      newQty = Math.floor(newQty / step) * step;
      if (newQty < step) newQty = step;
      newQty = roundQty(newQty); // round to avoid floating-point errors
    } else {
      if (newQty < 1) newQty = 1;
    }

    setQuantity(newQty);
    HandelChange && HandelChange(newQty);
    setShowStockMessage(false);
  };

  const displayQty = type === "unit" ? quantity : `${roundQty(quantity)} ${weightUnit}`;

  return (
    <div className="qty-wrapper relative inline-flex items-center gap-3 p-2 border rounded-lg">
      <button
        onClick={decrease}
        disabled={quantity <= step || stock === 0}
        style={{
          cursor: quantity <= step || stock === 0 ? "not-allowed" : "pointer",
          opacity: quantity <= step || stock === 0 ? 0.5 : 1,
          padding: "4px 12px",
          color: "#1D3E73",
          fontSize: "20px",
        }}
      >
        −
      </button>

      <span style={{ fontWeight: 600, fontSize: "16px", minWidth: "30px", textAlign: "center", color: "#1D3E73" }}>
        {displayQty}
      </span>

      <button
        onClick={increase}
        disabled={quantity >= stock || stock === 0}
        style={{
          cursor: quantity >= stock || stock === 0 ? "not-allowed" : "pointer",
          opacity: quantity >= stock || stock === 0 ? 0.5 : 1,
          padding: "4px 12px",
          color: "#1D3E73",
          fontSize: "20px",
        }}
      >
        +
      </button>

      {showStockMessage && (
        <div className="stock-message absolute top-full left-0 mt-2 w-max px-3 ml-5 py-1 bg-blue-100 text-red-800 text-sm rounded shadow-lg animate-fade-in">
          <p>{t("limited_stock_available")}</p>
        </div>
      )}
    </div>
  );
};

export default ProductQuantity;