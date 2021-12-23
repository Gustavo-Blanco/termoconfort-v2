import { Router } from 'express';
import { all, store, update, get, search } from './enterpriseController'
import { uploadMulter } from '../../services/images/Multer';

const router: Router = Router();

router.route('/all').get(all);
router.route('/store').post(uploadMulter.single('image'),store);
router.route('/update/:id').put(uploadMulter.single('image'), update);
router.route('/by-id/:id').get(get);
router.route('/search').post(search);


export default router;
