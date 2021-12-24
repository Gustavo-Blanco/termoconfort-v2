import { Router } from 'express';
import { all, store, update, images, search } from './productController'
import { uploadMulter } from '../../services/images/Multer';

const router: Router = Router();

router.route('/all').get(all);
router.route('/store').post(uploadMulter.array('images'),store);
router.route('/update/:id').put(uploadMulter.array('images'),update);
router.route('/images').get(images);
router.route('/search').post(search);

export default router;