// import axios from "axios";
import { server } from "../../const.js";

// load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const { data } = await fetch(`${server}/user/getuser`, {
      method: "GET",
      credentials: "include",
    });
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    if (error.response.status === 401) {
      dispatch({
        type: "LoadUserFail",
        payload: "You are not authorized to access this information.",
      });
    } else {
      dispatch({ type: "LoadUserFail", payload: error.response.data.message });
    }
  }
};

// load seller
export const loadSeller = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadSellerRequest",
    });
    const { data } = await fetch(`${server}/shop/getSeller`, {
      method: "GET",
      credentials: "include",
    });
    dispatch({
      type: "LoadSellerSuccess",
      payload: data.seller,
    });
  } catch (error) {
    if (error.response.status === 401) {
      dispatch({
        type: "LoadSellerFail",
        payload: "You are not authorized to access this information.",
      });
    } else {
      dispatch({
        type: "LoadSellerFail",
        payload: error.response.data.message,
      });
    }
  }
};

// user update information
export const updateUserInformation =
  (name, email, phoneNumber, password) => async (dispatch) => {
    try {
      dispatch({
        type: "updateUserInfoRequest",
      });

      const { data } = await fetch(`${server}/user/update-user-info`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          email,
          password,
          phoneNumber,
          name,
        }),
      });

      dispatch({
        type: "updateUserInfoSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "updateUserInfoFailed",
        payload: error.response.data.message,
      });
    }
  };

// update user address
export const updatUserAddress =
  (country, state, address1, city, zipCode, addressType) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "updateUserAddressRequest",
      });

      const { data } = await fetch(`${server}/user/update-user-addresses`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          country,
          state,
          address1,
          city,
          zipCode,
          addressType,
        }),
      });

      dispatch({
        type: "updateUserAddressSuccess",
        payload: {
          successMessage: "User address updated succesfully!",
          user: data.user,
        },
      });
    } catch (error) {
      dispatch({
        type: "updateUserAddressFailed",
        payload: error.response.data.message,
      });
    }
  };

// delete user address
export const deleteUserAddress = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteUserAddressRequest",
    });

    const { data } = await fetch(`${server}/user/delete-user-address/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    dispatch({
      type: "deleteUserAddressSuccess",
      payload: {
        successMessage: "User deleted successfully!",
        user: data.user,
      },
    });
  } catch (error) {
    dispatch({
      type: "deleteUserAddressFailed",
      payload: error.response.data.message,
    });
  }
};

// get all users --- admin
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllUsersRequest",
    });

    const { data } = await fetch(`${server}/user/admin-all-users`, {
      method: "GET",
      credentials: "include",
    });

    dispatch({
      type: "getAllUsersSuccess",
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: "getAllUsersFailed",
      payload: error.response.data.message,
    });
  }
};
