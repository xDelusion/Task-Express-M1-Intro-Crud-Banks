const PORT = 8000;

const express = require("express");
let accounts = require("./accounts");
const accountsRoutes = require("./api/accounts/accounts.routes.js");

const app = express();

app.use(express.json());
app.use("/accounts", accountsRoutes);

// get all accounts
app.get("/accounts", (req, res) => {
  return res.status(200).json(accounts);
});

app.post("/accounts", (req, res) => {
  const id = accounts[accounts.length - 1].id + 1;
  let newAccount = { id, ...req.body, funds: 0 };
  accounts.push(newAccount);
  return res.status(201).json(accounts);
});

/*
const newId = accounts[accounts.length - 1].id + 1;
let newAccount = req.body
newAccount = { ...newAccount, id: newId}, funds:0 }
accounts.push(newAccount)
return res.status(201).json({body: accounts})
*/

app.delete("/accounts/:accountId", (req, res) => {
  const { accountId } = req.params;
  accounts = accounts.filter((account) => account.id !== accountId);
  console.log("accounts", accounts);
  return res.status(204).json(accounts);
});

app.put("/accounts/:accountId", (req, res) => {
  const { accountId } = req.params;
  const foundAccount = accounts.find((account) => account.id === +accountId);
  if (foundAccount) {
    foundAccount.username = req.body.username;
    foundAccount.funds = req.body.funds;
  } else {
    res.status(404).json({ message: "Account not found" });
  }
});

/*
<--- line (39) --->
const account = accounts.find((acc) => acc.id == accountId)
if (!account) 
return res.status(404).json({
  msg: "Account not found!",
})
account.username = req.body.username ? req.body.username : account.username;
account.funds = req.body.funds ? req.body.funds : accounts.funds;
return res.status(200).json(account);
*/

app.listen(PORT, () => {
  console.log(`Server is up on port: ${PORT}`);
});
