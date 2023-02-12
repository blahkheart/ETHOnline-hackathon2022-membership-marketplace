const getTotalAmount = (_data, _callback) => {
  try {
    let _totalAmount = 0;
    const _orders = _data;
    for (let i = 0; i < _orders.length; i++) {
      let _amount = parseInt(_orders[i].amount);
      _totalAmount += _amount;
      _callback(_totalAmount);
    }
  } catch (e) {
    console.log(e);
  }
};

let formatting_options = {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
};

const formatNumberToCurrency = number => {
  const dollarStr = new Intl.NumberFormat("en-US", formatting_options);
  return dollarStr.format(number);
};

module.exports = { getTotalAmount, formatNumberToCurrency };
