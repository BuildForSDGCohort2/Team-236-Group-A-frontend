import React, { useEffect, useState } from "react";
import { Table, Spin, Alert } from "antd";

function Users() {
    const [data, setData] = useState([]);
    const [load, setLoad] = useState(false);
    const [msg, setMsg] = useState({
        message: "",
        type: ""
    });

    // possible User roles
    const roles = [ "USER", "ADMIN", "OFFICER" ];

    //On Role change
    const handleChange = (e) => {
        const { id, value } = e.target;
        const url = "https://api-agrofix.herokuapp.com/accounts/assign-role";
        const token = localStorage.getItem("token");

        const options = {
            method: "PUT",
            headers: {
                "content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({
                role: value,
                accountId: id
            })
        };

        //set loading state
        setLoad(true);

        //Change user role
        fetch(url, options)
        .then((res) => {
            if(res.ok) {
                setLoad(false);

                //Update localStorage
                localStorage.setItem("role", value)

                setMsg({
                    message: "Role Updated",
                    type: "success"
                });
            } else {
                setLoad(false);

                setMsg({
                    message: "Role Update Failed",
                    type: "error"
                });
            } 
        })
        .catch((err) => {
            setLoad(false);
            setMsg({ message: err.message, type: "error" })
        })
    };

    //On Alert Component Close
    const onClose = () => {
        setMsg("");
      };

    //Table Column Headers
    const columns  = [
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: '50%',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            width: '20%',
            key: 'role',
            render: (text, record) => (
                <select name="role" defaultValue={ text } id={record.id} onChange={handleChange}   >
                    {
                      roles.map((role, i) => (
                        <option 
                            key={i} 
                            value={role}

                        > {role} </option>
                      ))  
                    }
                </select>
            )
        },
    ];

    //On page load Fetch users from server
    useEffect(() => {
        const url = "https://api-agrofix.herokuapp.com/accounts";
        const token = localStorage.getItem("token");
        const options = {
            method: "GET",
            headers: {
                "Authorization": token
            }
        };

        //set loading state
        setLoad(true);

        //Fetch all users
        fetch(url, options)
        .then((res) => res.json())
        .then((data) => {
            if(data && data.data) {
                const users = data.data.map((itm) => ({
                    id: itm.id,
                    username: itm.username,
                    email: itm.email,
                    role: itm.role
                }));
                setData(users);
                setLoad(false);
            }else {
                setLoad(false);
                setMsg({message: data.error.message, type: "error"});
            }
        })
        .catch((err) => {
            setLoad(false);
            setMsg({message: err.message, type:"error"});
        });
        
    }, []);

    return (
        <div>
            <h1> Users </h1>
            <div className="table" >
                { msg.message? <Alert message={msg.message} type={msg.type} closable onClose={onClose} />  : null }<br />
                <Spin spinning={load}>
                    <Table 
                        columns={columns} 
                        dataSource={data} 
                    />
                </Spin>
            </div>
        </div>
    )
}

export default Users;
