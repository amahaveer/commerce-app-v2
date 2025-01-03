export interface SuccessResponse<T = any> {
    status: 'success';
    data: T;
  }
  
  export interface ErrorResponse {
    status: 'error';
    message: string;
    details?: any;
  }
  