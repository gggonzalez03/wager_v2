
export const base_url = "https://us-central1-betapp-255b5.cloudfunctions.net/api/";

export function getUserDetailByUsername(username, onSuccess, onError) {
  try {
    fetch(base_url + "getUserDetailByUsername/" + username, {
      method: "GET",
    }).then((data) =>
      data.json()
      .then((res) => {
        if (res != undefined) {
          onSuccess(res)
        } else {
          onError(res)
        }
      })
      .catch(e => onError(e))
    );
  } catch (err) {
      onError(err)
  }
}

export function addToBalance(data, onSuccess, onError) {
  try {
    fetch(base_url + "addToBalance", {
      method: "POST",
      body: JSON.stringify(data),
    }).then((data) => {
      data.json().then((res) => {
        if (res != undefined) {
          onSuccess(res)
        } else {
          onError(res)
        }
      })
      .catch(e => { console.log(e)} )
    });
  } catch (err) {
      onError(err)
  }
}

export function subtractFromBalance(data, onSuccess, onError) {
  try {
    fetch(base_url + "subtractToBalance", {
      method: "POST",
      body: JSON.stringify(data),
    }).then((data) => {
      data.json().then((res) => {
        if (res != undefined) {
          onSuccess(res)
        } else {
          onError(res)
        }
      })
      .catch(e => { console.log(e)} )
    });
  } catch (err) {
      onError(err)
  }
}

export function getBalance(username, onSuccess, onError) {
  try {
    fetch(base_url + "getBalance/" + username, {
      method: "GET",
    }).then((data) => {
      data.json().then((res) => {
        if (res != undefined) {
          onSuccess(res)
        } else {
          onError(res)
        }
      })
      .catch(e => { console.log(e)} )
    });
  } catch (err) {
      onError(err)
  }
}

/**
 * data = {
 *  username: string
 *  balance: integer
 * }
 */
export function updateBalance(data, onSuccess, onError) {
  try {
    fetch(base_url + "updateBalance/", {
      method: "POST",
      body: JSON.stringify(data),
    }).then((data) => {
      data.json().then((res) => {
        if (res != undefined) {
          onSuccess(res)
        } else {
          onError(res)
        }
      })
      .catch(e => { console.log(e)} )
    });
  } catch (err) {
      onError(err)
  }
}

// export function userSignUp(data) {
//   try {
//     fetch(base_url + "signUpUser", {
//       method: "POST",
//       body: JSON.stringify(data),
//     }).then((data) =>
//       data.json().then((res) => {
//         console.log(res)
//         if (res.token != undefined) {
//           return res
//         } else {
//           console.log(res)
//           return null
//         }
//       })
//     );
//   } catch (err) {
//     console.log(err)
//     return null
//   }
// }