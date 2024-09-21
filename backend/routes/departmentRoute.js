import express from "express";
import { getNoDepartment,getEmployees,getManagers,addManagers,addDepartment,getAllDepartments ,updateManager,deleteManager,getDepManagers} from "../controllers/departmentController.js";

const router = express.Router();

router.get("/noofdepartments", getNoDepartment)
router.get("/getemployees", getEmployees)
router.post("/adddepartments", addDepartment )
router.get("/getdepartments", getAllDepartments)
router.get("/getmanagers", getManagers)
router.post("/addmanagers", addManagers)
router.put("/updatemanagers/:managerId", updateManager)
router.delete("/deletemanagers/:id", deleteManager)
router.get("/getdepmanagers", getDepManagers)


//route.delete("/deletedepartment/:department_id", deleteDepartment);
//route.put("/updatedepartment/:department_id", updateDepartment);

 export default router;
