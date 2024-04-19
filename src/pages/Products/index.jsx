import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { fetchProductAPI, fetchDeleteProductAPI } from '~/api/product';
import { Button } from '@mui/material'
import { convertCurrency } from '~/utils/convertCurrency';
import { useNavigate } from 'react-router-dom';
import { API_ROOT } from '~/utils/const';
import { toast } from 'react-toastify';
import Modal from '@mui/material/Modal';

const ProductPage = () => {
  const [listProduct, setListProduct] = useState([]);
  const boxShadow = '0 2px 4px 0 rgba(158, 158, 158, 0), 0 2px 15px 0 rgba(0, 0, 0, 0.1)';
  const navigate = useNavigate();
  const [productDelete, setProductDelete] = useState(null);

  //Modal delete
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const handleOpenModalDelete = (id) => {
    setOpenModalDelete(true);
    let productTem = null;
    listProduct.forEach(product => {
      if(id === product._id){
        productTem = product;
      }
    })
    
    setProductDelete(productTem);
  }
  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
    setProductDelete(null);
  };

  const styleModalDelete = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '1px solid rgba(236, 240, 241,1.0)',
    boxShadow: 24,
    p: 2,
  };

  const createHandle = () => {
    navigate('/product/create');
  }

  const editHandle = (id) => {
    navigate('/product/edit/' + id)
  }

  const deleteHandle = async() => {
    try {
      await fetchDeleteProductAPI(productDelete._id);
      toast.success('Delete product succesfully!');
      const newListProduct = listProduct.filter(product => product._id !== productDelete._id);
      setListProduct(newListProduct);
      setOpenModalDelete(false);
    } catch (error) {
      console.log(error.response.data)
    }
  }

  const columns = [
    { field: '_id', headerName: 'ID', minWidth: 70, flex: 1, sortable: false },
    { field: 'name', headerName: 'Name', minWidth: 200, flex: 2 },
    { 
      field: 'price', 
      headerName: 'Price', 
      minWidth: 130, 
      flex: 1,
      valueGetter: (value) => convertCurrency(value)
    },
    { field: 'quantity', headerName: 'Quantity', minWidth: 200, flex: 1 },
    { 
      field: 'images', 
      headerName: 'Image', 
      minWidth: 90, 
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return(
          <>
            <img src={`${API_ROOT}/${params.value[0]}`} style={{width: '50%', height: '100%'}} />
          </>
        )
      }
    },
    { field: 'category', headerName: 'Category', minWidth: 90, flex: 1},
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      minWidth: 150, 
      flex: 1,
      renderCell: (row) => {
        return (
          <>
            <Button variant="contained" color="success" size="small" style={{marginRight: '5px'}} onClick={() => editHandle(row.id)}>Edit</Button>
            <Button variant="contained" color="error" size="small" onClick={() => handleOpenModalDelete(row.id)}>Delete</Button>
          </>
      );
      }
    },
  ];

  useEffect(() => {
    const fetchListProduct = async() => {
      const data = await fetchProductAPI();
      let listProductTem = data.map(Product => {
        let createdDate = new Date(Product.createdAt);  
        let updatedDate = null

        Product.createdAt = createdDate.getDay() + '/' + createdDate.getMonth() + '/' + createdDate.getFullYear();

        if(Product.updatedAt !== null){
          updatedDate = new Date(Product.updatedAt);
          Product.updatedAt = updatedDate.getDay() + '/' + updatedDate.getMonth() + '/' + updatedDate.getFullYear();
        }

        return Product
      });

      setListProduct(listProductTem)
    }
    fetchListProduct();
  }, [])

  return (
    <Box>
      <Modal
        open={openModalDelete}
        onClose={handleCloseModalDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModalDelete}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you delete this Product?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <span style={{fontWeight: 'bold'}}>Name: </span> 
            {productDelete?.name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <span style={{fontWeight: 'bold'}}>Price: </span> 
            {convertCurrency(productDelete?.price)}
          </Typography>
          <Box sx={{display: 'flex', justifyContent: 'flex-end', gap: '5px', marginTop: '20px'}}>
            <Button variant="contained" color="error" size="small" onClick={deleteHandle}>Delete</Button>
            <Button variant="outlined" size="small" onClick={handleCloseModalDelete}>Cancel</Button>
          </Box>
        </Box>
      </Modal>

      <div style={{ boxShadow: boxShadow, padding: '20px' }}>
        <Box sx={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
          <Typography display={{fontSize: '20px', fontWeight: 'bold', marginBottom: '10px'}}>
            List Product
          </Typography>
          <Button variant="contained" size="small" onClick={createHandle}>Create New</Button>
        </Box>
        <DataGrid
          rows={listProduct}
          rowHeight={80}
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

export default ProductPage;