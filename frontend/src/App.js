import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { DrugsPage } from "./pages/DrugsPage";
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Box, width } from "@mui/system";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { CreateDrugPage } from "./pages/CreateDrugPage";
import ShowDrug from "./pages/ShowDrug";
import SVGbackground from "./assets/polygon-scatter-haikei.svg";
import { PatientList } from "./pages/PatientList";
import { ShowPatient } from "./pages/ShowPatient";
import { CreateNewPatient } from "./pages/CreateNewPatient";
import { ReceptionistAppointmentView } from "./pages/ReceptionistAppointmentView";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Button } from "@mui/material";
import Cookies from "universal-cookie";
import { Homepage } from "./pages/Homepage";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
function App() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [LoginStatus, setLoginStatus] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  let cookies = new Cookies();
  useEffect(() => {
    if (cookies.get("Authorization") === undefined) {
      setLoginStatus(false);
    } else {
      setLoginStatus(true);
    }
  }, []);
  const logout = () => {
    cookies.remove("Authorization");
    setLoginStatus(false);
  };
  return (
    <>
      <div
        className="App"
        style={{
          backgroundColor: `rgba(0,0,0,0.1)`,
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="fixed" open={open}>
            <Toolbar
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{ mr: 2, ...(open && { display: "none" }) }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                  Hospital app
                </Typography>
              </div>
              <div>
                {LoginStatus == true ? (
                  <Button
                    onClick={() => logout()}
                    color="secondary"
                    variant="contained"
                  >
                    Logout
                  </Button>
                ) : (
                  <>
                    <Button
                      href="/register"
                      color="secondary"
                      variant="contained"
                      style={{ marginRight: "20px" }}
                    >
                      Register
                    </Button>
                    <Button href="/login" color="secondary" variant="contained">
                      {" "}
                      Login
                    </Button>
                  </>
                )}
              </div>
            </Toolbar>
          </AppBar>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "ltr" ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              {["Inbox", "Starred", "Send email", "Drafts"].map(
                (text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                )
              )}
            </List>
            <Divider />
            <List>
              {["All mail", "Trash", "Spam"].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Drawer>
          <Main open={open}>
            <DrawerHeader />
            <BrowserRouter>
              <Route exact path="/">
                <Homepage LoginStatus={LoginStatus} />
              </Route>
              <Route exact path="/drugs">
                <DrugsPage />
              </Route>
              <Route exact path="/drug/:id">
                <ShowDrug />
              </Route>
              <Route exact path="/drugs/create">
                <CreateDrugPage />
              </Route>
              <Route exact path="/patients">
                <PatientList />
              </Route>
              <Route exact path="/patients/create">
                <CreateNewPatient />
              </Route>
              <Route exact path="/patient/:id">
                <ShowPatient />
              </Route>
              <Route exact path="/appointments/">
                {" "}
                <ReceptionistAppointmentView />{" "}
              </Route>
              <Route exact path="/register">
                <Register />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
            </BrowserRouter>
          </Main>
        </Box>
      </div>
    </>
  );
}

export default App;
