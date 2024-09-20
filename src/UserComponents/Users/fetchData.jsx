import axiosInstance from "../../Components/Authentication/axios";



export const FetchBankAccounts = (userID, updateBankAccounts)=> {

    const user_id = userID
 
    axiosInstance.get(`api/v4/admin/all/merchant/bank/?query=${user_id}`).then((res)=> {
        // console.log(res.data.data)

        if (res.status === 200 && res.data.data) {
            const  sortedArray = res.data.data.sort((a,b)=> b.account.id - a.account.id)
            updateBankAccounts(sortedArray)
        }
        
    }).catch((error)=> {
        console.log(error)

    })
};