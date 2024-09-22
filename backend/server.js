import express from "express"
import employeeRoutes from "./routes/employeesRoute.js"
import departmentRoutes from "./routes/departmentRoute.js"
import adminRoutes from "./routes/adminRoute.js"
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json())

app.use("/api/employees", employeeRoutes)
app.use("/api/departments", departmentRoutes)
app.use("/api/admins", adminRoutes)

app.listen(8800, () => {
    console.log("Connected!")
})
