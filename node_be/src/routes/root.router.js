import express from 'express';
import userRoutes from './user.router.js';
import videoRoutes from './video.router.js';
import authRouter from './auth.router.js';

// tạo object router tổng
const rootRoutes = express.Router();

rootRoutes.use("/users", userRoutes);
rootRoutes.use("/videos", videoRoutes);
rootRoutes.use("/auth", authRouter);

// export rootRoutes cho index.js dùng
export default rootRoutes;