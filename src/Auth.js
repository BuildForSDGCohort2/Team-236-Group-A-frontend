//User Authentification and Authorization
const BASE_URL = "https://api-agrofix.herokuapp.com/auth";

//Base post fetch Options
const options = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },  
};


//Registration Function
export function register(values, callback) {
    const { username, email, password } = values;

    options.body = JSON.stringify({
        username,
        email,
        password
    });  

    fetch(BASE_URL+"/signup", options)
    .then((res) => res.json())
    .then((data) => {
        if(data.data && data.data.token) {
            localStorage.setItem("token","Bearer " + data.data.token);
            localStorage.setItem("role", data.data.role);
            callback();

        }else if (data && data.error) {
            callback(data.error.message);
        }
    })
    .catch((err) => {
        callback("Registration Failed");
    });
}


//Login function
export function login(values, callback) {
    const { username , password } = values;

    //Adding Login credentials Fetch Options
    options.body = JSON.stringify({
        usernameOrEmail: username,
        password
    });

    fetch(BASE_URL+"/login", options)
    .then((res) => res.json())
    .then((data) => {
        if(data.data && data.data.token) {
            localStorage.setItem("token","Bearer " + data.data.token);
            localStorage.setItem("role", data.data.role);
            callback();

        }else if (data && data.error) {
            callback(data.error.message);
        }
    })
    .catch((err) => {
        callback("Login Failed. Try Again");
    });
}