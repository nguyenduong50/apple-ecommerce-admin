import { useEffect, useState } from 'react';
import { Form, redirect, useActionData, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Typography, Button } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { fetchCsrfProductAPI, fetchUpdateProductAPI } from '~/api/product';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import ErrorModal from '~/components/UI/ErrorModal';
import { toast } from 'react-toastify';
import { fetchProductDetailsAPI } from '~/api/product';
import { API_ROOT } from '~/utils/const';

const EditProductPage = () => {
  const data = useActionData();
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);
  const [csrfToken, setCsrfToken] = useState('');
  const boxShadow = '0 2px 4px 0 rgba(158, 158, 158, 0), 0 2px 15px 0 rgba(0, 0, 0, 0.1)';
  const params = useParams() 

  //Input data Product
  // eslint-disable-next-line no-unused-vars
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(1);
  const [quantity, setQuantity] = useState(0);
  const [name, setName] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');

  //Function
  const errorHandle = () => {
    setError(null);
  };

  const nameChangeHandle = (event) => {
    setName(event.target.value);
  };

  const categoryChangeHandle = (event) => {
    setCategory(event.target.value);
  };

  const priceChangeHandle = (event) => {
    if(event.target.value < 0){
      setPrice(1);
      return;
    }

    setPrice(event.target.value);
  }

  const quantityChangeHandle = (event) => {
    if(event.target.value < 0){
      setQuantity(0);
      return;
    }

    setQuantity(event.target.value);
  }

  const shortDescriptionChangeHandle = (event) => {
    setShortDescription(event.target.value);
  }

  const longDescriptionChangeHandle = (event) => {
    setLongDescription(event.target.value);
  }

  useEffect(() => {
    const fetchCSRF = async() => {
      const data = await fetchCsrfProductAPI()
      setCsrfToken(data.csrfToken)
    }

    fetchCSRF()
  }, [])

  useEffect(() => {
    let errorTem = data?.message.split(". ");
    if (errorTem) {
      const error1 = errorTem[0].split(": ")[1];
      errorTem[0] = error1;
    }
    setError(errorTem);
  }, [data]);

  useEffect(() => {
    const fetchProductDetail = async(id) => {
      try {
        const response = await fetchProductDetailsAPI(id)
        setProduct(response)
        setName(response.name);
        setCategory(response.category);
        setPrice(response.price);
        setQuantity(response.quantity);
        setShortDescription(response.shortDescription);
        setLongDescription(response.longDescription);
      } catch (error) {
        console.log(error.response.data)
      }
    }
    fetchProductDetail(params.id)
  }, [params.id])

  return (
    <Box sx={{ boxShadow: boxShadow, padding: '20px' }}>
      {
        error &&
        <ErrorModal
          title='Error'
          messages={error}
          onConfirm={errorHandle}
        />
      }
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <Typography display={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>
          Edit Product
        </Typography>
      </Box>
      <Form method='post'>
        <Stack spacing={2}>
          <Stack spacing={1}>
            <label htmlFor="name">Product Name</label>
            <TextField fullWidth label="Enter Product Name" id="name" name="name" size="small" value={name || ''} onChange={nameChangeHandle} />
          </Stack>
          <Stack spacing={1}>
            <label htmlFor="category">Category</label>
            <FormControl fullWidth>
              <InputLabel id="category">Category</InputLabel>
              <Select
                labelId="Category"
                id="category"
                label="category"
                name="category"
                value={category || ''}
                onChange={categoryChangeHandle}
              >
                <MenuItem value="iphone">Iphone</MenuItem>
                <MenuItem value="ipad">Ipad</MenuItem>
                <MenuItem value="macbook">Macbook</MenuItem>
                <MenuItem value="airpod">Airpod</MenuItem>
                <MenuItem value="watch">Watch</MenuItem>
                <MenuItem value="mouse">Mouse</MenuItem>
                <MenuItem value="keyboard">Keyboard</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Stack spacing={2} direction="row">
            <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
              <label htmlFor="price">Price</label>
              <TextField label="price" id="price" name="price" type="number" size="small" value={price || 1} onChange={priceChangeHandle} />
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
              <label htmlFor="price">Quantity</label>
              <TextField label="quantity" id="quantity" name="quantity" type="number" size="small" value={quantity || 0} onChange={quantityChangeHandle} />
            </Box>
          </Stack>
          <Stack spacing={1}>
            <label htmlFor="short-description">Short Description</label>
            <TextField 
              fullWidth 
              label="Enter Short Description" 
              id="short-description" 
              name="shortDescription" 
              size="small" 
              value={shortDescription || ''}
              onChange={shortDescriptionChangeHandle}
            />
          </Stack>
          <Stack spacing={1}>
            <label htmlFor="Long-description">Long Description</label>
            <TextField 
              fullWidth 
              label="Enter Long Description" 
              id="long-description" 
              name="longDescription" 
              multiline 
              rows={5} 
              size="small" 
              value={longDescription || ''}
              onChange={longDescriptionChangeHandle}
            />
          </Stack>
          <ImageList sx={{ width: '100%', maxHeight: 200 }} cols={4} rowHeight={200}>
            {product?.images?.length > 0 && product?.images?.map((item, index) => (
              <ImageListItem key={index}>
                <img
                  srcSet={`${API_ROOT}/${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  src={`${API_ROOT}/${item}`}
                  alt="product"
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Stack>
        <input type="hidden" value={csrfToken} name="_csrf" />
        <Button
          variant="contained"
          size="medium"
          type="submit"
          style={{ backgroundColor: 'rgb(95,118,232)', marginTop: '10px' }}
        >
          Submit
        </Button>
      </Form>
    </Box>
  );
};

export default EditProductPage;

// eslint-disable-next-line react-refresh/only-export-components
export const action = async ({ request, params }) => {
  const data = await request.formData();

  const csrfToken = data.get('_csrf');
  const product = {
    name: data.get('name'),
    category: data.get('category'),
    price: data.get('price'),
    quantity: data.get('quantity'),
    shortDescription: data.get('shortDescription'),
    longDescription: data.get('longDescription'),
  }

  if(
    product.name !== '' && 
    product.category !== '' && 
    product.price > 1 &&
    product.quantity > 0 &&
    product.shortDescription !== '' && 
    product.longDescription !== ''
  ){    
    toast.info("Please wait a moment!" , {autoClose: 100, hideProgressBar: true});
  }

  try {
    await fetchUpdateProductAPI(params.id, product, csrfToken);
    toast.success("Update product successfully!");
    return redirect('/product');
  } catch (error) {
    console.log(error.response.data)
    return error.response.data
  }
}