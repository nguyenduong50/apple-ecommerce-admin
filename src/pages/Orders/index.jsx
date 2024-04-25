import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { fetchOrderAPI } from '~/api/order';
import { Button } from '@mui/material'

const OrderPage = () => {
  const [listOrder, setListOrder] = useState([]);
  const boxShadow = '0 2px 4px 0 rgba(158, 158, 158, 0), 0 2px 15px 0 rgba(0, 0, 0, 0.1)';

  const viewOrderHandle = () => {

  }

  const columns = [
    { field: 'userId', headerName: 'userId', minWidth: 70, flex: 1 },
    { field: 'name', headerName: 'Name', minWidth: 80, flex: 1 },
    { field: 'email', headerName: 'Email', minWidth: 120, flex: 1 },
    { field: 'phone', headerName: 'Phone', minWidth: 90, flex: 1 },
    { field: 'address', headerName: 'Address', minWidth: 150, flex: 1 },
    { 
      field: 'createdAt', 
      headerName: 'Order time',
      minWidth: 90, 
      flex: 1,
      valueGetter: (value) => value
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      minWidth: 100, 
      flex: 1,
      renderCell: (row) => {
        return (
          <>
            <Button variant="contained" size="small" style={{marginRight: '5px'}} onClick={() => viewOrderHandle(row.id)}>View Details</Button>
          </>
      );
      }
    },
  ];

  useEffect(() => {
    const fetchListOrder = async() => {
      const data = await fetchOrderAPI();

      let listOrderTem = data.map(order => {
        let createdDate = new Date(order.createdAt);  
        order.createdAt = createdDate.getDate() + '/' + (createdDate.getMonth() + 1) + '/' + createdDate.getFullYear();

        return order
      });

      setListOrder(listOrderTem)
    }
    fetchListOrder();
  }, [])

  return (
    <Box>
      <div style={{ boxShadow: boxShadow, padding: '20px' }}>
        <Typography display={{fontSize: '20px', fontWeight: 'bold', marginBottom: '10px'}}>
          List Order
        </Typography>
        <DataGrid
          rows={listOrder}
          getRowId={(row) => row._id}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
          // checkboxSelection
        />
      </div>
    </Box>
  );
};

export default OrderPage;