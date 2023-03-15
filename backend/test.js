const jwt = require('jsonwebtoken');
let jwtSecretKey = "kuch_bhi";

let data = {
  mail:"email",
  passcode:"password"
};

const token = jwt.sign(data, jwtSecretKey);
console.log(token); 