import { Router } from "express";
import userRouter from '../components/user/userRouter';
import enterpriseRouter from '../components/enterprise/enterpriseRouter';
import productRouter from '../components/product/productRouter';
import postRouter from '../components/post/postRouter';

const router: Router = Router({ mergeParams: true });

router.use('/user',userRouter);
router.use('/enterprise',enterpriseRouter);
router.use('/product',productRouter);
router.use('/post',postRouter);

export default router;
