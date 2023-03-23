export const login = (user_ac, user_password) => {
  return fetch("http://localhost:8000/", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      user_ac: user_ac,
      user_password: user_password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user_ac", user_ac);
      return data;
    })
    .catch((err) => {
      console.log("密碼錯誤");
    });
};

export const getList = () => {
  let token = localStorage.getItem("token");
  let user_ac = localStorage.getItem("user_ac");
  // console.log(token)
  return fetch("http://localhost:8000/user/todolist/" + user_ac, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data)
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postList = (text) => {
  let token = localStorage.getItem("token");
  let user_ac = localStorage.getItem("user_ac");
  return fetch("http://localhost:8000/user/addtodolist", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // "Content-Type": "application/x-www-form-urlencoded",
      authorization: token,
    },
    body: JSON.stringify({ user_ac: user_ac, user_text: text }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
};

export const delList = (text_id) => {
  let token = localStorage.getItem("token");
  let user_ac = localStorage.getItem("user_ac");
  return fetch(
    "http://localhost:8000/user/deletelist/" + user_ac + "/" + text_id,
    {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
};

export const putList = (text_id,user_text) => {
  console.log(text_id)
  console.log(user_text)
  let token = localStorage.getItem("token");
  let user_ac = localStorage.getItem("user_ac");
  return fetch("http://localhost:8000/user/puttodolist/"+text_id, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // "Content-Type": "application/x-www-form-urlencoded",
      authorization: token,
    },
    body: JSON.stringify({ user_ac: user_ac,text_id:text_id,user_text: user_text }),
  })
  .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
};

export const createAccount=(user_ac,user_password)=>{
  return fetch("http://localhost:8000/create", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    body: JSON.stringify({ user_ac: user_ac, user_password: user_password }),
  })
  .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user_ac", data.user_ac);
      return data;
    });
}
