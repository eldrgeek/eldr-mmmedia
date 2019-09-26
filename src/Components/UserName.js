import React from "react";
import { Typography } from "@material-ui/core";
import { connect } from "react-redux";
import StorageProvider from "../redux/storage/index";

const UserNameImpl = ({ user }) => {
  return (
    <StorageProvider>
      <Typography> User name {user.name}</Typography>
    </StorageProvider>
  );
};

const mapStateToProps = state => {
  console.log("Userstate ", JSON.stringify(state));
  return {
    user: state.user
  };
};
// export default UserName
export const UserName = connect(mapStateToProps)(UserNameImpl);

const ProvidedElement = () => (
  <StorageProvider>
    <UserName a={10} />
  </StorageProvider>
);

export default ProvidedElement;
