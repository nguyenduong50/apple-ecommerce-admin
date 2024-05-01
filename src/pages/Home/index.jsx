import { Grid, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { fetchUserCustomerAPI } from '~/api/user';
import { convertCurrency } from '~/utils/convertCurrency';
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [client, setClient] = useState(1);
  const [earnning, setEarning] = useState(0);
  const [newOrder, setNewOrder] = useState(0);
  const [listOrder, setListOrder] = useState([]);

  const navigate = useNavigate();

  const viewOrderHandle = (orderId) => {
    navigate('/order/' + orderId);
  }

  const boxShadow = '0 2px 4px 0 rgba(158, 158, 158, 0), 0 2px 15px 0 rgba(0, 0, 0, 0.1)';
  const cssInfoBoardItem = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '30px 20px',
    boxShadow: boxShadow,
    borderRight: '1px solid rgba(236, 240, 241,1.0)'
  }

  const cssQuantity = {
    fontWeight: 'bold',
    fontSize: '25px'
  }

  const cssInfoBoardItemName = {
    color: 'rgba(189, 195, 199,1.0)',
    fontSize: '14px'
  }

  const cssInfoBoardItemIcon = {
    color: 'rgba(189, 195, 199,1.0)',
    fontSize: '30px',
  }

  const columns = [
    { field: 'userId', headerName: 'userId', minWidth: 70, flex: 1 },
    { field: 'name', headerName: 'Name', minWidth: 80, flex: 1 },
    { field: 'phone', headerName: 'Phone', minWidth: 90, flex: 1 },
    { field: 'address', headerName: 'Address', minWidth: 150, flex: 1 },
    { 
      field: 'totalOrder', 
      headerName: 'Total', 
      minWidth: 150, 
      flex: 1,
      valueGetter: (value) => convertCurrency(value) 
    },
    { 
      field: "delivery", 
      headerName: 'Delivery', 
      sortable: false,
      minWidth: 150, 
      flex: 1, 
      renderCell: () => {return (<>Waiting for progresing</>)} 
    },
    { 
      field: "status", 
      headerName: 'Status', 
      sortable: false,
      minWidth: 150, 
      flex: 1, 
      renderCell: () => {return (<>Waiting for pay</>)}  
    },
    {
      field: "action",
      headerName: "Detail",
      sortable: false,
      minWidth: 100, 
      flex: 1,
      renderCell: (row) => {
        return (
          <>
            <Button variant="contained" size="small" color="success" style={{marginRight: '5px'}} onClick={() => viewOrderHandle(row.id)}>View</Button>
          </>
      );
      }
    },
  ];

  useEffect(() => {
    const fetchUserCustomer = async() => {
      try {
        const response = await fetchUserCustomerAPI();
        setClient(response.client)
        setEarning(response.totalEarningMonth)
        setNewOrder(response.newOrder)
        setListOrder(response.orders)
      } catch (error) {
        console.log(error.response.data)
      }
    }

    fetchUserCustomer();
  }, [])

  return (
    <Box>
      <Box>
        <Grid container spacing={0}>
          <Grid item xs={4}>
            <Box sx={cssInfoBoardItem}>
              <Stack>
                <span style={cssQuantity}>{client}</span>
                <span style={cssInfoBoardItemName}>Clients</span>
              </Stack>
              <PersonAddAltIcon style={cssInfoBoardItemIcon} />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={cssInfoBoardItem}>
              <Stack>
                <span style={cssQuantity}>{convertCurrency(earnning)}</span>
                <span style={cssInfoBoardItemName}>Earnings of Month</span>
              </Stack>
              <AttachMoneyIcon style={cssInfoBoardItemIcon} />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={cssInfoBoardItem}>
              <Stack>
                <span style={cssQuantity}>{newOrder}</span>
                <span style={cssInfoBoardItemName}>New Order</span>
              </Stack>
              <NoteAddOutlinedIcon style={cssInfoBoardItemIcon} />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <div style={{ marginTop: '30px', boxShadow: boxShadow, padding: '20px' }}>
        <Typography display={{fontSize: '20px', fontWeight: 'bold', marginBottom: '30px'}}>
          History
        </Typography>
        <DataGrid
          rows={listOrder}
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

export default HomePage;