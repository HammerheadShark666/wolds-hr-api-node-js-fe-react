import { AxiosError } from 'axios';
 
export function handleError(error: unknown, rejectWithValue: (value: any) => void) {
  console.log(error);

  if (error instanceof AxiosError && error.response) {
    const data = error.response.data as any;
 
    const errors =
      data?.error ||
      data?.errors ||
      (data?.message ? [data.message] : [error.message]);

    return rejectWithValue(errors);
  } 
  
  if (error instanceof Error) {
    return rejectWithValue([error.message || "An unknown error occurred"]);
  }

  return rejectWithValue(["An unknown error occurred"]);
}
