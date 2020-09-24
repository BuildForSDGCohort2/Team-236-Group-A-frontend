import React from "react";
import Dashboard from "./Dashboard";
import Users from "./Users";


function AdminPanel({selected}) {
  
    switch (selected) {
        case "Dashboard":
           return <Dashboard />
        case "Users":
            return <Users />   
        default:
            return <Dashboard />
    }
}

export default AdminPanel;
