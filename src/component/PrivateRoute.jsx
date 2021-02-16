import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router";

const PrivateRoute = props => {
  const { type } = props;
  const {loggingIn} = props.authentication;
  if (type === "private" && !loggingIn) return <Redirect to="/login" />;
  return <Route {...props} />;
};

function mapStateToProps(state) {
    const {authentication} = state;
    return {authentication}
  }

export default connect(mapStateToProps)(PrivateRoute);