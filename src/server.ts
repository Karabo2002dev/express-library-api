import bodyParser from "body-parser";
import express, { Express } from "express";
import cors from "cors";
import { loggerMiddleware } from "./middleware/loggerMiddleware";
import authorRouter from "./routes/author";
import { errorMiddleware } from "./middleware/errorMiddleware";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(loggerMiddleware);

app.use("/", authorRouter);

app.use(errorMiddleware);

const PORT: string | number = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
