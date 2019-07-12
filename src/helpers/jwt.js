export const decodeJWT = token => {
  var ca = token;
  var base64Url = ca.split(".")[1];
  var decodedValue = JSON.parse(window.atob(base64Url));
  return decodedValue;
};

export const isTokenJWTExpired = token => {
  let decodedValue = decodeJWT(token);
  const now = Date.now().valueOf() / 1000;
  if (now > decodedValue.exp) {
    return false;
  }
  return true;
};
