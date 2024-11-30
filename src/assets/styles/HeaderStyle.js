export const HeaderStyle = {
  headerFullStyle: { backgroundColor: "white !important",    boxShadow:"0 2px 4px rgba(0,0,0,.2)", },
  iconGridContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: "3px 50px",
    background:"rgb(252, 237, 238)",
  },
  monkeyLogoStyle: { width: "45px", height: "45px" },
  cartStyle: {
    width: "20px",
    height: "18px",
    margin: "0rem 1rem",
  },
  profileIconStyle: { width: "20px", height: "18px" },

  //   menu style
  menuGridStyle: {
    // backgroundColor: "#f5f5f5 ",
    padding: "12px 0 12px 50px",
  },
  menuBtnStyle: {
    color: "black",
    fontSize: "14px",
    "&:hover": {
      backgroundColor: "#E6E6E6 !important",
      borderRadius: "28px",
    },
  },
  lgjaStyle: {
    ".MuiMenu-list": {
      width: "236px",
    },
    ".MuiPopover-paper": {
      padding: "1rem 1rem 1rem 0",
      borderRadius: "20px",
      width: "236px",
      // backgroundColor: "red",
    },
  },
  openOnHover: {
    "&:hover": { display: "block" },
  },
};
