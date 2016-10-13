import commaNumber from 'comma-number';

const enums = {
  buyer: 'BUYER',
  seller: 'SELLER',
  default: 'GUEST',
  DEFAULT_WIDTH: '80%',
  prettifyNumber: num => {
    num = Number(num);
    let retval = num.toFixed(2);
    retval = retval.toString();
    retval = retval.split('.');
    retval[0] = commaNumber(retval[0]);
    return '$' + retval.join('.');
  }
}

export default enums;