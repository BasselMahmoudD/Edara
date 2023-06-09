//cookies and localStorage

export const setAuthUser = (data) =>{
    //set object to localStorage
    localStorage.setItem("user" , JSON.stringify(data));
}

export const GetAuthUser = (data) =>{
    if(localStorage.getItem("user")){
        return JSON.parse(localStorage.getItem("user"));
    }
}

export const removeAuthUSer = () =>{
    if(localStorage.getItem("user")) localStorage.removeItem("user");
}