import React from 'react'
//引入 路由
import { BrowserRouter as Router, Route, Link ,Redirect} from 'react-router-dom';
// 引入 layout
import { Layout,Menu} from 'antd';
import './css/main.css'
//相关路由组件
import IndexComponent from './components/IndexComponent' //首页
import MovieComponent from './components/MovieComponent' //正在热应
import AboutComponent from './components/AboutComponent' //Top200

const { Header, Footer, Content } = Layout;
const style = {
  height:'100%'
};
export default class Welcome extends React.Component {
    render() {
        return <div style = {style}>
        <Router>
        <Layout className="layout" style = {style} >
            <Header>
                <div className="logo" />
                <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                style={{ lineHeight: '64px' }}
                >
                
                    <Menu.Item key="1"><Link to="/">首页</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/movieComponent">电影</Link></Menu.Item>
                    <Menu.Item key="3"><Link to="/aboutComponent">关于</Link></Menu.Item>
                
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <div style={{ background: '#fff', padding: 24, minHeight: 280,paddingBottom:0,height:'100%' }}>
                    <Route exact path="/" component={ IndexComponent } />
                    <Route path="/movieComponent" component={ MovieComponent } />
                    <Route path="/aboutComponent" component={ AboutComponent } />
                    <Redirect to = '#'/>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by 邱桂升</Footer>
            </Layout>
        </Router>
        </div>;
    }
}