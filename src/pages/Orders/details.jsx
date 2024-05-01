import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchOrderDetailAPI } from "~/api/order";
import Typography from '@mui/material/Typography';
import { convertCurrency } from "~/utils/convertCurrency";
import { DataGrid } from '@mui/x-data-grid';
import { API_ROOT } from '~/utils/const';

const OrderDetail = () => {
  const params = useParams();
  const [order, setOrder] = useState(null);

  const columns = [
    { field: 'id', headerName: 'ID Product', minWidth: 300 },
    { 
      field: 'image', 
      headerName: 'Image', 
      minWidth: 200,
      renderCell: (params) => {
        return(
          <>
            <img src={`${API_ROOT}/${params.value}`} style={{width: '40%', height: '100%'}} />
          </>
        )
      } 
    },
    { field: 'name', headerName: 'Name', minWidth: 350 },
    {
      field: 'price',
      headerName: 'Price',
      minWidth: 180,
      valueGetter: (value) => convertCurrency(value),
    },
  ];

  useEffect(() => {
    const fetchOrderDetail = async(orderId) => {
      try {
        const response = await fetchOrderDetailAPI(orderId);
        setOrder(response);
      } catch (error) {
        console.log(error.response.data)
      }
    }
    fetchOrderDetail(params.id);
  }, [params])

  return (
    <>
      <Typography variant="h5">Information Order</Typography>
      <Typography>User Id: {order?.userId}</Typography>
      <Typography>Name: {order?.name}</Typography>
      <Typography>Phone: {order?.phone}</Typography>
      <Typography>Address: {order?.address}</Typography>
      <Typography>Total: {order?.totalOrder && convertCurrency(order?.totalOrder)}</Typography>

      {
        order?.productOrder.length > 0 &&
        <div style={{ marginTop: '30px', width: '100%' }}>
          <DataGrid
            rows={order?.productOrder}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </div>
      }
    </>
  );
};

export default OrderDetail;