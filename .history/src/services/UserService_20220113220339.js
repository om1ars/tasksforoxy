/**
 *
 * @param {username, password} creds
 */
import axios from "axios";

export const login = creds => {
    //return axios.post(loginURl, creds)
    const formData = new FormData()
    const {username,password,domain}=creds;
    formData.append("_username",username)
    formData.append("_password",password)
    formData.append("_subdomain",domain)
    return new Promise((resolve,reject)=>{
        axios({
            method:"POST",
            url:`https://${domain}.ox-sys.com/security/auth_check`,
            data:formData,
        }).then((res)=>{
            localStorage.setItem("user",res.data.token)
            resolve(res.data)
        }).catch((err)=>{
            reject(err)
        })
    })

    // return new Promise((resolve, reject) => {
    //     const { username, password, domain } = creds
    //
    //     if (username === 'user_task' && password === 'user_task' && domain === 'toko') {
    //         const user = {
    //             username,
    //             token: '123abcd1234'
    //         }
    //         localStorage.setItem('user', JSON.stringify(user))
    //         resolve(user)
    //     } else {
    //         reject({
    //             msg: 'Invalid Creds'
    //         })
    //     }
    // })
}

export const logout = () => {
    localStorage.removeItem('user')
}

export const checkUser = () => {
    // console.log(localStorage.getItem('user'));
    return localStorage.getItem('user')
}