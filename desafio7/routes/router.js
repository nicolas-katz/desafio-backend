import express from 'express';
const { Router } = express();
const router = Router();
import { _read, _readById, _create, _update, _delete } from '../methods';

router.route('/')
.get(_read)
.post(_create)

router.route('/:id')
.get(_readById)
.put(_update)
.delete(_delete)

export default { router }