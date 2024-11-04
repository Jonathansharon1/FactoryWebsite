import { Routes, Route } from 'react-router-dom';

import LoginComp from './components/Login';
import EmployeesComp from './components/Employees/Employees';
import EditEmoloyyeComp from './components/Employees/EditEmployee';
import AddEmployeeComp from './components/Employees/AddEmployee';
import DepartmentsComp from './components/Department/Departments';
import EditDepComp from './components/Department/EditDep';
import AddDepComp from './components/Department/AddDep';
import ShiftsComp from './components/Shifts/Shifts';
import UsersComp from './components/Users/Users';




function App() {

  return (
    <>
        <Routes>
          <Route path="/" element={<LoginComp />} />
          <Route path="/employees" element={<EmployeesComp />} />
          <Route path='/editEmployee' element={<EditEmoloyyeComp/>}/>
          <Route path='/addEmployee' element={<AddEmployeeComp/>}/>
          <Route path='/departments' element={<DepartmentsComp/>}/>
          <Route path='/editDepartment' element={<EditDepComp/>}/>
          <Route path='/addDepartment' element={<AddDepComp/>}/>
          <Route path='/shifts' element={<ShiftsComp/>}/>
          <Route path='/users' element={<UsersComp/>}/>


        </Routes>
    </>
  )
}

export default App
