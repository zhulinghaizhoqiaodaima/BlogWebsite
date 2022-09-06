import { createAxiosByinterceptors } from "../utils/axios";

const request = createAxiosByinterceptors({
  baseURL: 'http://localhost:5000',
});

export default request;

