import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  copyright: {
    fontSize: "12px",
    color: "#801317",
    fontWeight: "700",
    [theme.breakpoints.down("sm")]: {
      fontSize: "10px",
      fontWeight: "700",
    },

  },
  copyrightRow:{
    margin:"1rem 0"
  },

  centeredColumn: {
    display: "flex",
    justifyContent: "center",
  },
}));
const Footer = () => {
  const classes = useStyles();
  return (
    <Container fluid>
      <Row className={classes.copyrightRow}>
        <Col className={classes.centeredColumn}>
          <div className={classes.copyright}>
            All Copyright reserved by © Ecommerce Pvt Ltd.
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;


