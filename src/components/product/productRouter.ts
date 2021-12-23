import { Router } from 'express';
import { all, store } from './productController'
import { uploadMulter } from '../../services/images/Multer';

const router: Router = Router();

router.route('/all').get(all);
router.route('/store').post(uploadMulter.array('images'),store);


export default router;
