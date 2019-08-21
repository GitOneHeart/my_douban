import React from 'react'
import MovieListComponent from './MovieListComponent'

//引入 路由
import { BrowserRouter as Router, Route, Link , Redirect } from 'react-router-dom';

//内置 組件
import { Layout, Menu} from 'antd';
const { Content, Sider } = Layout;
//我的樣式
const myStyle = { height:'100%'}
export default class MovieComponent extends React.Component {
    render() {
        return (
            <Router>
            <Layout style = { myStyle }>
                <Sider width={200} style={{ background: '#fff',height:'100%' }}>
                    <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                    >
                        <Menu.Item key="1"><Link to="/movieComponent/in_theaters" >正在熱映</Link></Menu.Item>
                        <Menu.Item key="2"><Link to="/movieComponent/coming_soon">即將上映</Link></Menu.Item>
                        <Menu.Item key="3"><Link to="/movieComponent/top250">Top250</Link></Menu.Item>
                    </Menu>
                </Sider>
                
                    <Layout style={{ padding: '0 1px 0px' }}>
                    
                        <Content
                        style={{
                            background: '#fff',
                            padding: 24,
                            paddingBottom:0,
                            height:'100%',
                            margin: 0,
                            minHeight: 280,
                        }}
                        >
                        
                        <Route exact path="/movieComponent/:type" component={ MovieListComponent }/>
                        <Redirect to={'/movieComponent/in_theaters'}/>
                        </Content>

                    </Layout>
            </Layout>
            </Router>
        )
    }
}