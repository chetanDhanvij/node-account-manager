import express from "express"

import { getAccounts, createAccount, getAccount, deleteAccount, updateAccount } from '../controllers/accounts.js';

const router = express.Router();

router.get('/', getAccounts);

router.post('/', createAccount);

router.get('/:id', getAccount);

router.delete('/:id', deleteAccount);

router.patch('/:id', updateAccount);

export default router;