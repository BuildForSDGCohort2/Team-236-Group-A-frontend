import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { UserOutlined, DashboardOutlined } from "@ant-design/icons";


const { Content , Sider } = Layout;


function Admin() {
    const [head, setHead] = useState("Admin Dashboard");
    const [selected, setSelected] = useState("Dashboard");
    const [width, setWidth] = useState(200);

    const handleClick = (e) => {
        setHead(e.key);
        setSelected(e.key); 
    };

    return (
        <div>
            <Layout style={{ minHeight: "100vh", position: "relative" }}>
                <Sider 
                    className="side-bar"
                    trigger={null}
                    collapsible
                    onCollapse={() => setWidth(80)}
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
                    <h1>{ head }</h1>
                </Content>
            </Layout>
        </div>
    );
}

export default Admin
