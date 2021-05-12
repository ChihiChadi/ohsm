// eslint-disable-next-line 
export default {
    login : async user =>{
        console.log(user.email);
        const res = await fetch('/LogIn', {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        if (res.status !== 401)
            return res.json().then(data => data);

        else
            return { isAuthenticated: false, user: { email: "", role: "" } };
    },
    register : async user =>{
        console.log(user);
        const res = await fetch('/Register', {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        const data = await res.json();
        return data;
    },
    logout : async ()=>{
        const res = await fetch('/LogOut');
        const data = await res.json();
        return data;
    },
   isAuthenticated :  ()=>{
        return fetch('Auth')
        .then(res=>{
       if (res.status !== 401)
           return res.json().then(data => data);
       else
           return { isAuthenticated: false, user: { email: "", role: "" } };
    });
}}
