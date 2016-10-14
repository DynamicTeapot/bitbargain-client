import commaNumber from 'comma-number';

const arrayify = fakeArray => {
  if(Array.isArray(fakeArray)){
    return fakeArray;
  } else {
    return [fakeArray];
  }
}

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
  },
  ensureArray: fakeArray => {
    if(Array.isArray(fakeArray)) {
      return fakeArray;
    } else {
      try {
        return arrayify(JSON.parse(fakeArray));
      } catch (err) {
        try {
          return arrayify(JSON.parse('"' + fakeArray + '"'));
        }
        catch (err) {
          return arrayify(fakeArray.slice(1,-1).split(','));
        }
      }
    }
  }

}

export default enums;