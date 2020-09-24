import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { UserOutlined, DashboardOutlined } from "@ant-design/icons";
import AdminPanel from "./AdminPanel";

const { Content , Sider } = Layout;


function Admin() {
    const [selected, setSelected] = useState("Dashboard");
    const [width, setWidth] = useState(200);

    const handleClick = (e) => {
        setSelected(e.key); 
    };

    const handleCollapse = () => {
        width === 200 ? setWidth(80) : setWidth(200);
    }

    return (
        <div>
            <Layout style={{ minHeight: "100vh", position: "relative" }}>
                <Sider 
                    className="side-bar"
                    collapsible
                    onCollapse={ handleCollapse }
                    breakpoint="md"
                    collapsedWidth="80px"
                    style={{
                        overflow: "auto",
                        height: "100vh",
                        position: "fixed",
                        left: 0,
                        top: 0,
                        paddingTop: 80
                    }}
                >
                    <Menu theme="dark" mode="inline" selectedKeys={[selected]}>
                        <Menu.Item 
                            onClick={ handleClick } 
                            key="Dashboard" 
                            icon={<DashboardOutlined />} 
                        >Dashboard</Menu.Item>

                        <Menu.Item 
                            onClick={ handleClick } 
                            key="Users" 
                            icon={<UserOutlined/>}
                        >Users</Menu.Item>
                    </Menu>
                </Sider>
                <Content
                    style={{marginLeft: width, paddingTop: 80}}
                > 
                  <AdminPanel selected={selected} />
                </Content>
            </Layout>
        </div>
    );
}

export default Admin;
