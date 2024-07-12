import React from "react";
import { Snackbar as MuiSnackbar, Alert } from "@mui/material";
import {
  useSnackbar,
  SnackbarProvider,
  SnackbarKey,
  closeSnackbar,
} from "notistack";

// 这个组件现在主要用于自定义 Snackbar 的外观
const CustomSnackbar = React.forwardRef(function CustomSnackbar(
  props: any,
  ref: any
) {
  const { id, message, variant } = props;
  return (
    <MuiSnackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={3000}
      ref={ref}
    >
      <Alert
        severity={variant}
        sx={{ width: "100%" }}
        onClose={() => closeSnackbar(id)}
      >
        {message}
      </Alert>
    </MuiSnackbar>
  );
});

export function Snackbar() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  React.useEffect(() => {
    enqueueSnackbar("Welcome to the app!", { variant: "success" });
  }, [enqueueSnackbar]);

  return null; // 这个组件不需要渲染任何内容
}

// 创建一个包装了 SnackbarProvider 的自定义 Provider
export function CustomSnackbarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SnackbarProvider
      maxSnack={3}
      Components={{
        default: CustomSnackbar,
        success: CustomSnackbar,
        error: CustomSnackbar,
        warning: CustomSnackbar,
        info: CustomSnackbar,
      }}
    >
      {children}
    </SnackbarProvider>
  );
}

// 使用方法：
// 在你的应用的根组件中：
// import { CustomSnackbarProvider } from './path/to/this/file';
//
// function App() {
//   return (
//     <CustomSnackbarProvider>
//       {/* 你的应用组件 */}
//     </CustomSnackbarProvider>
//   );
// }
//
// 然后在任何组件中使用 Snackbar：
// import { useSnackbar } from 'notistack';
//
// function MyComponent() {
//   const { enqueueSnackbar } = useSnackbar();
//
//   const handleClick = () => {
//     enqueueSnackbar('This is a success message!', { variant: 'success' });
//   };
//
//   return <button onClick={handleClick}>Show Snackbar</button>;
// }
