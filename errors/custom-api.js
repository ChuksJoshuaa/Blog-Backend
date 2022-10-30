class CustomAPIError extends Error {
  constructor(message) {
    super(message);
  }
}

const CustomApi = CustomAPIError;
export default CustomApi;
