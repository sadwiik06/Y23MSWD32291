const bcrypt = require("bcryptjs");

const storedHashedPassword = "$2b$10$V.ZCeqfz4kPaDFCyoSfB6OL0RwPjTbTY/MDzgt4YwzUFwLt6MO.ya"; // From DB
const enteredPassword = "password123"; // The password you tried

async function checkPassword() {
  const isMatch = await bcrypt.compare(enteredPassword, storedHashedPassword);
  console.log("Password Match Test:", isMatch);
}

checkPassword();
