const getName = (req, res) => {
  res.send('Sarah Birch');
};

const getSecondName = (req, res) => {
  res.send('Pamela Gomez');
};

const getThirdName = (req, res) => {
  res.send('Layla Lopez');
};

module.exports = { getName, getSecondName, getThirdName};
