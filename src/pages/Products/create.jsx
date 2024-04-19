import { useEffect, useState } from 'react';
import { Form, redirect, useActionData } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Typography, Button } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { fetchCreateProductAPI } from '~/api/product';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import ErrorModal from '~/components/UI/ErrorModal';
import { toast } from 'react-toastify';
import LoadingModal from '~/components/UI/LoadingModal';

const CreateProductPage = () => {
  const data = useActionData();
  const [error, setError] = useState(null);
  const [listImage, setListImage] = useState([]);
  // const [listImageFile, setListImageFile] = useState([]);
  const boxShadow = '0 2px 4px 0 rgba(158, 158, 158, 0), 0 2px 15px 0 rgba(0, 0, 0, 0.1)';
  const [price, setPrice] = useState(1);
  const [quantity, setQuantity] = useState(0);

  const errorHandle = () => {
    setError(null);
  };

  const [openLoading, setOpenLoading] = useState(false);
  const handleCloseLoading = () => {
    setOpenLoading(false);
  };
  const handleOpenLoading = () => {
    let timerId = setInterval(() => setOpenLoading(true), 100);
    setTimeout(() => {
      clearInterval(timerId);
      setOpenLoading(false);
    }, 1000);
  };

  const [category, setCategory] = useState('');

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

  const imageHandle = (event) => {
    const images = Array.from(event.target.files);
    const listImage = images.map(image => {
      return URL.createObjectURL(image);
    });
    setListImage(listImage);
    // setListImageFile(images);
  };

  // const createNewProductHandle = async(e) => {
  //   e.preventDefault();
  //   try {
  //     const formData = new FormData();

  //     for(let i = 0; i <= listImageFile.length - 1; i++){
  //       formData.append("images", listImageFile[i]);
  //     }

  //     formData.append('title', 'product 01');
  //     formData.append('price', 1200000);

  //     await fetchCreateProductAPI(formData);
  //     return;
  //   } catch (error) {
  //     return error.response.data;
  //   }
  // }

  useEffect(() => {
    let errorTem = data?.message.split(". ");
    if (errorTem) {
      const error1 = errorTem[0].split(": ")[1];
      errorTem[0] = error1;
    }
    setError(errorTem);
  }, [data]);

  return (
    <Box sx={{ boxShadow: boxShadow, padding: '20px' }}>
      <LoadingModal openLoading={openLoading} handleCloseLoading={handleCloseLoading} />
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
          Create Product
        </Typography>
      </Box>
      <Form method='post' encType='multipart/form-data'>
        <Stack spacing={2}>
          <Stack spacing={1}>
            <label htmlFor="name">Product Name</label>
            <TextField fullWidth label="Enter Product Name" id="name" name="name" size="small" />
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
                size="medium"
                value={category}
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
              <TextField label="price" id="price" name="price" type="number" size="small" value={price} onChange={priceChangeHandle} />
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
              <label htmlFor="price">Quantity</label>
              <TextField label="quantity" id="quantity" name="quantity" type="number" size="small" value={quantity} onChange={quantityChangeHandle} />
            </Box>
          </Stack>
          <Stack spacing={1}>
            <label htmlFor="short-description">Short Description</label>
            <TextField fullWidth label="Enter Short Description" id="short-description" name="shortDescription" size="small" />
          </Stack>
          <Stack spacing={1}>
            <label htmlFor="Long-description">Long Description</label>
            <TextField fullWidth label="Enter Long Description" id="long-description" name="longDescription" multiline rows={5} size="small" />
          </Stack>
          <label style={{color: 'rgba(189, 195, 199,1.0)', fontSize: '14px'}}>Upload Images (Max 5 Images)</label>
          <input name="images" type="file" style={{marginTop: '5px'}} onChange={imageHandle} multiple />
          <ImageList sx={{ width: '100%', maxHeight: 200 }} cols={5} rowHeight={200}>
            {listImage?.length > 0 && listImage?.map((item, index) => (
              <ImageListItem key={index}>
                <img
                  srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  src={item}
                  alt="product"
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Stack>
        <Button
          variant="contained"
          size="medium"
          type="submit"
          style={{ backgroundColor: 'rgb(95,118,232)', marginTop: '10px' }}
          onClick={handleOpenLoading}
        >
          Submit
        </Button>
      </Form>
    </Box>
  );
};

export default CreateProductPage;

// eslint-disable-next-line react-refresh/only-export-components
export const action = async ({ request }) => {
  const data = await request.formData();

  const newProduct = {
    name: data.get('name'),
    category: data.get('category'),
    price: data.get('price'),
    shortDescription: data.get('shortDescription'),
    longDescription: data.get('longDescription'),
    quantity: data.get('quantity'),
    images: data.getAll('images')
  }

  const listImageFile = data.getAll('images');
  for(let i = 0; i <= listImageFile.length - 1; i++){
    data.append("images", listImageFile[i]);
  }

  if(
    newProduct.name !== '' && 
    newProduct.category !== '' && 
    newProduct.price !== '' &&
    newProduct.shortDescription !== '' && 
    newProduct.longDescription !== '' &&
    newProduct.quantity > 0 &&
    newProduct.images.length > 0
  ){
    toast.info("Please wait a moment!" , {autoClose: 2000, hideProgressBar: true})
  }

  try {
    await fetchCreateProductAPI(data);
    toast.success("Create product successfully!");
    return redirect('/product');
  } catch (error) {
    console.log(error.response.data)
    return error.response.data
  }
}