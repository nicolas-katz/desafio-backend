import express from 'express';
const { Router } = express();
const router = Router();
import { _get, _new, _getAll, _msgNormalized } from '../methods';

router.route('/')
.get(_get)
.post(_new)

router.route('/normalized')
.get(_msgNormalized)

router.route('/test')
.get(_getAll)

export default { router }