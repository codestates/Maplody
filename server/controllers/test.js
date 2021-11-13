const { User } = require('../models');

module.exports = {
  post: (req, res) => {
    console.log(req.body.userId);
    User.findOne({ where: { userId: req.body.userId } })
      .then((data) => {
        if (!data) {
          return res.status(404).json('id not found');
        }
        return res.status(200).json('id found');
      })
      .catch((err) => res.json(err));
  },
};
