import { useState,useEffect } from "react";
import _ from "lodash";

import Table from "./Table";
import { api } from '../helpers/urls'
import Pagination from './Pagination';

//users shown in one page
const pageSize=10;

function App() {

  //local states
  const [users,setUsers]=useState([]);
  const [paginatedUsers,setPaginatedUsers]=useState([]); 
  const [currentPage,setCurrentPage]=useState(1);

  //local state for all the selected users through checkbox.
  const [selectedUsers,setSelectedUsers]=useState([]);

  //fetching users from api and setting it in local states when component is mounted
  useEffect(()=>{
    fetch(api)
    .then((res)=>res.json())
    .then((data)=>{
        setUsers(data);
        setPaginatedUsers(_(data).slice(0).take(pageSize).value())
    })
  },[])

  //no of pages required on the basis of numbers of users
  const pageCount= users ? Math.ceil(users.length/pageSize) : 0 ; 
  const pages= _.range(1,pageCount+1);

  //setting paginated user acording to the page number
  const pagination=(pageNo)=>{
      setCurrentPage(pageNo);
      const startIndex=(pageNo-1) * pageSize ;
      const paginatedUser= _(users).slice(startIndex).take(pageSize).value();
      setPaginatedUsers(paginatedUser);
  }

  return (
   <div>

      <Table 
        users={users} 
        setUsers={setUsers} 
        paginatedUsers={paginatedUsers} 
        setPaginatedUsers={setPaginatedUsers} 
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
        currentPage={currentPage}
      />

      <Pagination 
        pages={pages} 
        currentPage={currentPage} 
        pagination={pagination}
        setSelectedUsers={setSelectedUsers}
      />
      
   </div>
  );
}

export default App;
