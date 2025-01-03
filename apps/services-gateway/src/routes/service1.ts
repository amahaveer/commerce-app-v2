import { Router, Request, Response } from 'express';
import dotenv from 'dotenv';
import axios from 'axios';

const router = Router();
dotenv.config();

const BACK_OFFICE_SERVICE_URL = process.env.BACK_OFFICE_SERVICE_URL as string;

router.use(async (req: Request, res: Response) => {
  try {
    const headers = { ...req.headers };
    delete headers['content-length'];
    // Log the request details for debugging
    const axiosConfig = {
        method: req.method,
        url: `${BACK_OFFICE_SERVICE_URL}${req.path}`,
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        data: req.body,
      };
    console.log(
      JSON.stringify(axiosConfig
        ),
    );

    // Configure axios to include body data only for methods that require it
    

    const response = await axios(axiosConfig);
    res.status(response.status).json(response.data);
  } catch (error: any) {
    console.error('Error in forwarding request:', error.message);
    res
      .status(error.response?.status || 500)
      .json({ error: { message: error.message } });
  }
});

export default router;
