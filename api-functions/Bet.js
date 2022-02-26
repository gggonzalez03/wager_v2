export const base_url = "https://us-central1-betapp-255b5.cloudfunctions.net/api/";

export function getPublicBets(onSuccess, onError) {
  try {
    fetch(base_url + "getPublicBets", {
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


export function getOpenBetsByUsername(username, onSuccess, onError) {
  try {
    fetch(base_url + "getOpenBetsByUsername/" + username, {
      method: "GET",
    }).then((data) =>
      data.json().then((res) => {
        if (res != undefined) {
          onSuccess(res)
        } else {
          onError(res)
        }
      })
    );
  } catch (err) {
      onError(err)
  }
}

export function updateBetsOwned(bet, onSuccess, onError) {
  try {
    fetch(base_url + "updateBetsOwned", {
      method: "POST",
      body: JSON.stringify(bet),
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

export function updateBetsParticipated(bet, onSuccess, onError) {
  try {
    fetch(base_url + "updateBetsParticipated", {
      method: "POST",
      body: JSON.stringify(bet),
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

export function updateBetStatus(bet, onSuccess, onError) {
  try {
    fetch(base_url + "updateBetStatus", {
      method: "POST",
      body: JSON.stringify(bet),
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

export function createBet(bet, onSuccess, onError) {
  try {
    fetch(base_url + "createBet", {
      method: "POST",
      body: JSON.stringify(bet),
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

export function getBetHistoryByUsername(username, onSuccess, onError) {
  try {
    fetch(base_url + "getBetHistoryByUsername/" + username, {
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

export function getBetNotifications(username, onSuccess, onError) {
  try {
    fetch(base_url + "getBetNotifications/" + username, {
      method: "GET",
    }).then((data) => {
      data.json().then((res) => {
        if (res != undefined) {
          onSuccess(res)
        } else {
          onError(res)
        }
      })
      .catch(e => { onError(e) } )
    });
  } catch (err) {
      onError(err)
  }
}

export function getBet(betid, onSuccess, onError) {
  try {
    fetch(base_url + "getBet/" + betid, {
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

export function likeABet(bet, onSuccess, onError) {
  try {
    fetch(base_url + "likeABet", {
      method: "POST",
      body: JSON.stringify(bet)
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

export function unlikeABet(bet, onSuccess, onError) {
  try {
    fetch(base_url + "unlikeABet", {
      method: "POST",
      body: JSON.stringify(bet)
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

export function updateOutcome(bet, onSuccess, onError) {
  try {
    fetch(base_url + "updateOutcome", {
      method: "POST",
      body: JSON.stringify(bet)
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

export function updateOppositeOutcome(bet, onSuccess, onError) {
  try {
    fetch(base_url + "updateOppositeOutcome", {
      method: "POST",
      body: JSON.stringify(bet)
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