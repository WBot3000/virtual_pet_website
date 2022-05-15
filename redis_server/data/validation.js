function validString(str) {
  if (!str || typeof str !== "string" || !str.trim()) return false;
  return true;
}

function whitespace(str) {
  return /\s/.test(str);
}

function special(str) {
  var specials = /[*|\":<>[\]{}`\\()';@&$]/;
  return specials.test(str);
}

function validUsername(str) {
  //if(whitespace(str)){
  //    return false;
  //}
  //else
  if (special(str)) {
    return false;
  } else {
    return true;
  }
}

function convertObjId(doc) {
  doc._id = doc._id.toString();
  return doc;
}

function validNum(num) {
  if (num === 0) return true;
  if (!num || isNaN(num)) return false;
  return true;
}

module.exports = {
  validString,
  validUsername,
  convertObjId,
  validNum,
};
