import { v4 as uuid } from 'uuid' 
import { ApiError }  from "../error/ApiError.js" 
import { validateAccountNumber, validateAccountType, validateCurrency }  from "../model/AccountValidations.js" 

let accounts = [{
    id: "test",
    accountName: "chetan Dhanvij",
    accountNumber: "54456456456456",
    accountType: "SAVING",
    currency: "NOK"
}];

export const getAccounts = (req, res) => {
    res.send(accounts);
}

export const getAccount = (req, res, next) => {
    const account = accounts.find(account => account.id === req.params.id);
    if(!account){
        next(ApiError.notFound('Account not found'));
        return;
    }

    res.send(account)
};

export const createAccount = (req, res, next) => {
    const account = req.body;

    if(!validateAccountNumber(account.accountNumber)){
        next(ApiError.badRequest('Account Number is invalid'));
        return;
    }

    if(!validateAccountType(account.accountType)){
        next(ApiError.badRequest('Account Type is invalid'));
        return;
    }

    if(!validateCurrency(account.currency)){
        next(ApiError.badRequest('Account Currency is invalid'));
        return;
    }


    const newAccount = {...account, id: uuid()}
    accounts.push(newAccount);
    console.log(`Account [${newAccount.accountName}] added to the database.`);
    res.send(newAccount);
};

export const deleteAccount = (req, res) => {
    console.log(`account with id ${req.params.id} has been deleted`);
    accounts = accounts.filter((account) => account.id !== req.params.id);
    res.send("Deleted");
};

export const updateAccount =  (req,res, next) => {
    const account = accounts.find((account) => account.id === req.params.id);

    if(!account){
        next(ApiError.notFound('Account not found'));
        return;
    }

    account.accountName = req.body.accountName;
    console.log(`accountName has been updated to ${req.body.accountName}.`);
    res.send(account);

};