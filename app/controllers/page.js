exports.historyOrder = (req, res) => {
  return res.render("index");
};

exports.openPosition = (req, res) => {
  return res.render("open-position");
};

exports.detailPosition = (req, res) => {
  return res.render("detail-position", { ticket: req.params.ticket });
};
