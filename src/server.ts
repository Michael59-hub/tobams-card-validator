import express from "express";
import validatorRoutes from "./routes/validator.route";
const app = express();


app.use(express.json());
app.use("/api/validator", validatorRoutes)

app.get("/", (req: any, res: any) => {
  res.send("Server up");
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
})