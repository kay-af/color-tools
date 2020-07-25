const lib = require("../lib_interface");

module.exports = {
  lookup: function (req, res) {
    const q = req.query.q;

    if (!q) {
      return res.status(400).json({
        status: "fail",
        cause: "missing query",
      });
    }

    const color = q
      .split(",")
      .map((value) => parseInt(value))
      .map((value) => lib.clamp(value, 0, 255));

    if (color.length != 3) {
      return res.status(400).json({
        status: "fail",
        cause: "invalid color",
      });
    }

    var k = parseInt(req.query.match) || 1;
    k = Math.max(1, k);

    lib
      .lookupColor(color, k)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log("Error occured: " + err);
        res.status(500).json({
          status: "fail",
          cause: "internal server error",
        });
      });
  },
};
