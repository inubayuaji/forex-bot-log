const moment = require("moment");
const Position = require("../models/position.js");

exports.index = async (req, res) => {
  var filter = {};

  if (req.query.closed != undefined) {
    filter = { isClosed: req.query.closed };
  }

  var positions = await Position.find(filter);
  return res.json(positions);
};

exports.create = async (req, res) => {
  const position = new Position({
    isClosed: false,
    ticket: req.body.ticket,
    type: req.body.type, // OP_BUY: 0, OP_SELL: 1
    size: req.body.size,
    symbol: req.body.symbol,
    openTime: dateHandler(req.body.openTime),
    openPrice: req.body.openPrice,
    comment: req.body.comment,
    modifications: [
      {
        time: dateHandler(req.body.openTime),
        detail: {
          stopLoss: req.body.stopLoss,
          takeProfit: req.body.takeProfit,
          comment: "TP1",
        },
      },
    ],
  });

  await position.save();

  return res.json({
    message: "success added.",
    code: 200,
  });
};

exports.find = async (req, res) => {
  var position = await Position.findOne({ ticket: req.params.ticket });

  return res.json(position);
};

exports.close = async (req, res) => {
  var position = await Position.findOne({ ticket: req.params.ticket });

  position.isClosed = true;
  position.comment = req.body.comment,
  position.closePrice = req.body.closePrice;
  position.closeTime = dateHandler(req.body.closeTime);
  position.swap = req.body.swap;
  position.profit = req.body.profit;

  await position.save();

  return res.json({
    message: "success closed.",
    code: 200,
  });
};

exports.indexModify = async (req, res) => {
  var position = await Position.findOne({ ticket: req.params.ticket });

  return res.json(position.modifications);
};

exports.createModify = async (req, res) => {
  var position = await Position.findOne({ ticket: req.params.ticket });

  position.modifications.push({
    time: moment().toISOString(),
    detail: {
      stopLoss: req.body.stopLoss,
      takeProfit: req.body.takeProfit,
      comment: req.body.comment,
    },
  });

  await position.save();

  return res.json({
    message: "success added",
    code: 200,
  });
};

function dateHandler(date) {
  return moment(date, "YYYY.MM.DD hh:mm").toISOString();
}
