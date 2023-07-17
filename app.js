const PORT = 8000;

const express = require("express");
const accountsRoutes = require("./api/accounts/accounts.routes.js");

const app = express();

app.use(express.json());
app.use("/accounts", accountsRoutes);

app.listen(PORT, () => {
  console.log(`Server is up on port: ${PORT}`);
});
