import express, { Request, Response } from "express";
import { UserModel } from "@/model/user.model";

const app = express();

app.get("/", (req: Request, res: Response) => {
  const { name } = req.query;

  if (name) {
    res.send(`Hello ${name}`);
    return;
  }

  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
