import { Router } from 'express';
import { all, store, update, images, search, deactive, addInterested, deleteInterested, getIntProduct } from './productController'
import { uploadMulter } from '../../services/images/Multer';

const router: Router = Router();

router.route('/all').get(all);
router.route('/store').post(uploadMulter.array('images'), store);
router.route('/update/:id').put(uploadMulter.array('images'), update);
router.route('/images').get(images);
router.route('/search').post(search);
router.route('/deactivate/:id').put(deactive);
router.route('/interested/').post(addInterested);
router.route('/get-interested-prod').post(getIntProduct);
router.route('/delete-interested/:id').delete(deleteInterested);

export default router;