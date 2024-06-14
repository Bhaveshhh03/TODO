import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
//create action

export const createtask=createAsyncThunk("createtask",async(data,{rejectWithValue})=>{
    const response=await fetch("http://localhost:5000/createtask",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(data)
    })
    try {
        const result=await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
})

//gettask
export const gettask = createAsyncThunk(
    "gettask",
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetch("http://localhost:5000/gettask");
        const result = await response.json();
        return result;
      } catch (error) {
        console.error('Fetch error:', error);
        return rejectWithValue(error.message ? error.message : 'Failed to fetch tasks');
      }
    }
  );
 
  //deletetask

  export const deletetask =createAsyncThunk("deletetask",async(id,{rejectWithValue})=>{
    try {
        const response = await fetch(`http://localhost:5000/deletetask/${id}`,{
            method:"DELETE"
        });
        const result =await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
  })
//updatestatus_task
export const updatestatus = createAsyncThunk(
    "updatestatus",
    async (data, { rejectWithValue }) => {
      try {
        const response = await fetch(`http://localhost:5000/updatetask/${data._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        return result; 
      } catch (error) {
        console.error('Update task error:', error);
        return rejectWithValue(error.message ? error.message : 'Failed to update task');
      }
    }
  );
  
export const Todotask =createSlice({
    name:"Todotask",
    initialState:{
        tasks:[],
        loading:false,
        error:null
    },
    extraReducers:(builder)=>{
        
        builder
        .addCase(createtask.pending,(state)=>{
            state.loading=true;
        })
        .addCase(createtask.fulfilled,(state,action)=>{
            state.loading=false;
            state.tasks.push(action.payload);
        })
        .addCase(createtask.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
        builder
        .addCase(gettask.pending,(state)=>{
            state.loading=true;
            state.error=null
        })
        .addCase(gettask.fulfilled,(state,action)=>{
            state.loading=false;
            state.tasks=action.payload;
        })
        .addCase(gettask.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
        builder
        .addCase(deletetask.pending,(state)=>{
            state.loading=true;
            state.error=null
        })
        .addCase(deletetask.fulfilled,(state,action)=>{
            state.loading=false;
            const {_id}=action.payload
            if(_id){
                state.tasks=state.tasks.filter((item)=>item._id!==_id)
            }
        })
        .addCase(deletetask.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
        builder
        .addCase(updatestatus.pending,(state)=>{
            state.loading=true;
            state.error=null
        })
        .addCase(updatestatus.fulfilled,(state,action)=>{
            state.loading=false;
            state.tasks= state.tasks.map((item)=>(
                item._id===action.payload._id?action.payload:item
            ))
        })
        .addCase(updatestatus.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });

        }
    
});
export default Todotask.reducer