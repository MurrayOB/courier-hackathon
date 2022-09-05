import { Request, Response } from "express";

const fetchExample = async (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: `This is an example.`,
    data: [],
  });
};

export { fetchExample };
