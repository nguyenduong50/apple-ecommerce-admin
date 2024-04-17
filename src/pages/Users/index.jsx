import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { fetchUserAPI } from '~/api';

const UserPage = () => {
  const [listUser, setListUser] = useState([]);

  const boxShadow = '0 2px 4px 0 rgba(158, 158, 158, 0), 0 2px 15px 0 rgba(0, 0, 0, 0.1)';

  const columns = [
    { field: 'name', headerName: 'Name', minWidth: 70, flex: 1 },
    { field: 'email', headerName: 'Email', minWidth: 130, flex: 1 },
    { field: 'role', headerName: 'Role', minWidth: 90, flex: 1 },
    { field: 'createdAt', headerName: 'Created at', minWidth: 90, flex: 1},
    { 
      field: 'updatedAt', 
      headerName: 'Updated at', 
      minWidth: 90, 
      flex: 1,
      valueGetter: (value) => `${value !== null ? value : 'Haven\'t updated yet'}`
    },
    {
      field: '_deleted',
      headerName: 'Status',
      description: 'This column is not sortable.',
      sortable: false,
      minWidth: 160,
      flex: 1,
      valueGetter: (value) => `${value ? 'Deleted' : 'Active'}`
    },
  ];

  useEffect(() => {
    const fetchListUser = async() => {
      const data = await fetchUserAPI();
      let listUserTem = data.map(user => {
        let createdDate = new Date(user.createdAt);  
        let updatedDate = null

        user.createdAt = createdDate.getDay() + '/' + createdDate.getMonth() + '/' + createdDate.getFullYear();

        if(user.updatedAt !== null){
          updatedDate = new Date(user.updatedAt);
          user.updatedAt = updatedDate.getDay() + '/' + updatedDate.getMonth() + '/' + updatedDate.getFullYear();
        }

        return user
      });

      setListUser(listUserTem)
    }
    fetchListUser();
  }, [])

  return (
    <Box>
      <div style={{ boxShadow: boxShadow, padding: '20px' }}>
        <Typography display={{fontSize: '20px', fontWeight: 'bold', marginBottom: '10px'}}>
          List User
        </Typography>
        <DataGrid
          rows={listUser}
          getRowId={(row) => row._id}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          // checkboxSelection
        />
      </div>
    </Box>
  );
};

export default UserPage;