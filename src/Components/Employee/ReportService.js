// eslint-disable-next-line 
export default {
    getReport :  ()=>{
        return fetch('/MyReports')
                .then(res=>{
                    if(res.status !== 401){
                        return res.json().then(data => data);
                    }
                    else
                        return {message : {msgBody : "UnAuthorized",msgError : true}};
                });
    },
    postReport : report=>{
        return fetch('/AddIncidentReports',{
            method : "post",
            body : JSON.stringify(report),
            headers:{
                'Content-Type' : 'application/json'
            }
        }).then(res=>{
            if(res.status !== 401){
                return res.json().then(data => data);
            }
            else
                return {message : {msgBody : "UnAuthorized"},msgError : true};
        });
    }
}