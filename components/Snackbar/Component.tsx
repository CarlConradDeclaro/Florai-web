import React from "react";
import { SnackbarProvider, useSnackbar, VariantType } from "notistack";
import Button from "@mui/material/Button"; // Assuming you're using Material UI
import Image from "next/image";
import trash from "../../assest/trash.png"; // Fixed the path for trash icon

// Set up the SnackbarProvider at the app's root
function Snackbar({
  variant,
  handleClickVariant,
}: {
  variant: VariantType;
  handleClickVariant: () => void;
}) {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <MyApp variant={variant} handleClick={handleClickVariant} />
    </SnackbarProvider>
  );
}

// Your component that uses snackbars
function MyApp({
  variant,
  handleClick,
}: {
  variant: VariantType;
  handleClick: () => void;
}) {
  const { enqueueSnackbar } = useSnackbar();
  const handleClickVariant = (variant: VariantType) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar("This is a success message!", { variant });
    handleClick();
  };

  return (
    <React.Fragment>
      <Button onClick={handleClickVariant("success")}>
        <Image
          src={trash}
          alt="delete"
          className="w-[30px] h-[30px] cursor-pointer"
        />
      </Button>
    </React.Fragment>
  );
}

export default Snackbar;
