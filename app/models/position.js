const { Schema, Decimal128, model } = require("mongoose");
const moment = require("moment");

const decimalType = {
  type: Decimal128,
  default: null,
  get(value) {
    if (value != undefined && value != null) {
      return parseFloat(value.toString());
    }
    return value;
  },
};
const dateType = {
  type: Date,
  default: null,
  get(value) {
    if (value != null) {
      return moment(value).format("YYYY-MM-DD HH:mm");
    }
    return value;
  },
};

const modificationSchema = Schema(
  {
    time: dateType,
    detail: {
      stopLoss: decimalType,
      takeProfit: decimalType,
      comment: String,
    },
  },
  { toJSON: { getters: true } }
);

const positionSchema = Schema(
  {
    isClosed: {
      type: Boolean,
      default: false,
    },
    ticket: Number,
    type: {
      type: Number,
      get(value) {
        if (value == 0) {
          return "Buy";
        } else {
          return "Sell";
        }
      },
    }, // OP_BUY: 0, OP_SELL: 1
    size: decimalType,
    symbol: String,
    openTime: dateType,
    closeTime: dateType,
    openPrice: decimalType,
    closePrice: decimalType,
    swap: decimalType,
    profit: decimalType,
    comment: String,
    modifications: [modificationSchema],
  },
  { collection: "positions", toJSON: { getters: true } }
);

module.exports = model("Position", positionSchema);
