import { Grid, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import { DataGrid } from '@mui/x-data-grid';

const HomePage = () => {
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
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
  ];

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

  return (
    <Box sx={{ padding: '20px' }}>
      <Box>
        <Grid container spacing={0}>
          <Grid item xs={4}>
            <Box sx={cssInfoBoardItem}>
              <Stack>
                <span style={cssQuantity}>2</span>
                <span style={cssInfoBoardItemName}>Clients</span>
              </Stack>
              <PersonAddAltIcon style={cssInfoBoardItemIcon} />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={cssInfoBoardItem}>
              <Stack>
                <span style={cssQuantity}>50.000.000<sup style={{ fontSize: '14px' }}>VND</sup></span>
                <span style={cssInfoBoardItemName}>Earnings of Month</span>
              </Stack>
              <AttachMoneyIcon style={cssInfoBoardItemIcon} />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={cssInfoBoardItem}>
              <Stack>
                <span style={cssQuantity}>2</span>
                <span style={cssInfoBoardItemName}>New Order</span>
              </Stack>
              <NoteAddOutlinedIcon style={cssInfoBoardItemIcon} />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <div style={{ marginTop: '30px', boxShadow: boxShadow, padding: '20px' }}>
        <Typography display={{fontSize: '20px', fontWeight: 'bold', marginBottom: '30px'}}>History</Typography>
        <DataGrid
          rows={rows}
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