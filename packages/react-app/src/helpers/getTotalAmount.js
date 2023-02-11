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

export default getTotalAmount;
