import {Main, DrawerHeader} from '../Content';
import AllPipeTable from './AllpipeTable';
import { useEffect, useState } from "react";
import axiosInstance from "../Authentication/axios";
import { AllPipeColumn } from "./Column";





function Allpipe({open}) {

  const [pipeData, updatePipeData] = useState([]);

  const headCells = AllPipeColumn;

  const PipeTableName = "All Available Pipes"


useEffect(() => {
   axiosInstance.get(`api/v5/admin/pipes/`).then((res)=> {
    // console.log(res.data.all_pipes_data)

    if(res.data && res.data.all_pipes_data) {
        const sortedData = res.data.all_pipes_data.sort((a, b)=> a.id - b.id)
        updatePipeData(sortedData)
    }
    
  }).catch((error)=> {
    console.log(error.response)

  })
  }, [])



return (
    <>
    <Main open={open}>
    <DrawerHeader />
    
        <AllPipeTable 
        headCells={headCells} 
        rows={pipeData} 
        TableName={PipeTableName}
        updatePipeData={updatePipeData}
        />
      
    </Main>
    </>
  );
}

export default Allpipe;
