let accounts = require("../../accounts");

exports.accountGet =
  ("/",
  (req, res) => {
    return res.status(200).json(accounts);
  });

exports.accountCreate =
  ("/",
  (req, res) => {
    const id = accounts[accounts.length - 1].id + 1;
    let newAccount = { id, ...req.body, funds: 0 };
    accounts.push(newAccount);
    return res.status(201).json(accounts);
  });

exports.accountDelete =
  ("/:accountId",
  (req, res) => {
    const { accountId } = req.params;
    accounts = accounts.filter((account) => account.id !== accountId);
    console.log("accounts", accounts);
    return res.status(204).json(accounts);
  });

exports.accountUpdate =
  ("/:accountId",
  (req, res) => {
    const { accountId } = req.params;
    const foundAccount = accounts.find((account) => account.id === +accountId);
    if (foundAccount) {
      foundAccount.username = req.body.username;
      foundAccount.funds = req.body.funds;
    } else {
      res.status(404).json({ message: "Account not found" });
    }
  });
