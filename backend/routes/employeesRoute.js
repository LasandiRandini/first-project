import express from "express";
import { getNoEmployees,getDepartments,addEmployees,getAllEmployees} from "../controllers/employeesController.js";

const router = express.Router();

router.get("/noofemployees", getNoEmployees)
router.post("/addemployees", addEmployees)
router.get("/getemployees", getAllEmployees)
router.get("/getdepartments", getDepartments)
//route.delete("/deleteemployee/:employee_id", deleteEmployee);
//route.put("/updateemployee/:employee_id", updateEmployee);

 export default router;
