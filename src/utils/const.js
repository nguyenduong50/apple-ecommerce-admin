let apiRoot = '';

if (import.meta.env.MODE === 'development') {
  apiRoot = 'http://localhost:5000';
}

if (import.meta.env.MODE === 'production') {
  apiRoot = 'https://apple-ecommerce-server.onrender.com';
}
console.log(import.meta.env);
export const API_ROOT = apiRoot;