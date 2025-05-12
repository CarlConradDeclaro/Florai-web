import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { UserTypes } from "@/types/user";
import { AccountCircle, Login } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { Skeleton } from "@mui/material";

interface AccountMenuProps {
  user: UserTypes | undefined;
  logout: () => void;
}

export default function AccountMenu({
  user,

  logout,
}: AccountMenuProps) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    router.push("/features/login");
  };
  const handleLogin = () => {
    router.push("/features/login");
  };
  const handSignUp = () => {
    router.push("/features/register");
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {/*  <Skeleton variant="circular" width={32} height={32} />; */}

            <Avatar sx={{ width: 32, height: 32 }}>
              {user?.username ? user.username[0] : null}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {user?.username
          ? [
              <MenuItem key="profile">
                <Avatar /> Profile
              </MenuItem>,
              <Divider key="divider1" />,
              <MenuItem key="settings">
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>,
              <MenuItem onClick={handleLogout} key="logout">
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>,
            ]
          : [
              <MenuItem onClick={handleLogin} key="login">
                <ListItemIcon>
                  <AccountCircle fontSize="small" />
                </ListItemIcon>
                Log In
              </MenuItem>,

              <MenuItem onClick={handSignUp} key="signup">
                <ListItemIcon>
                  <PersonAdd fontSize="small" />
                </ListItemIcon>
                Sign Up
              </MenuItem>,
            ]}
      </Menu>
    </React.Fragment>
  );
}
