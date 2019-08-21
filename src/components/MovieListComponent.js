import React from 'react'
import '../css/main.css'
// 引入获取电影列表数据类型的 服务
import GetMovieListDataType from '../service/douban_movie_service'
import { Spin, Alert } from 'antd';
import { Rate } from 'antd';

export default class MovieListComponent extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.match.params.type,
            isLoading:false
        };
    }
    componentWillMount() {
        this.setState({
            isLoading:true
        },function() {
            this.loadData()
        })
    }
    loadData() {

        GetMovieListDataType.getMovieListDataType(this.state.type).then((data)=> {
            console.log(data)
            this.setState({
                isLoading : false,
                movielist : data.subjects
            })
        })
    }
    render() {

        return (<div style = {{ width:'100%',height:'100%',position:'relative' }}>
            { this.createMovieList() }
        </div>)

    }
    // 创建电影列表
    createMovieList() {
        console.log(this.state.isLoading + '加载状态')
        if( this.state.isLoading ) {
            return <Spin tip="正在加载电影列表~">
                <Alert
                message="Alert message title"
                description="Further details about the context of this alert."
                type="info"
                />
            </Spin>
        }else {
            // const movieItems = 
            return <div className='movieList'>
                {
                    this.state.movielist.map((item,i)=> {
                            return <li className = 'movieLi' key = { i } >

                                <img src = { item.images.small } alt = { item.subtype } style= {{ width:'100px' }}/>
                                { item.title }
                                <h3>电影类型：{ item.genres }</h3>
                                <h3>上映年份：{ item.year }</h3>
                                <Rate disabled defaultValue={ item.rating.average/2 } />
                            </li>
                    })
                }
            </div>

            // console.log(this.state.movielist)
        }
    }
    componentWillReceiveProps(nextProps, nextContext) {
        // console.log(nextProps.match.params.type)
        this.setState({
            type: nextProps.match.params.type,
            isLoading: true
        },function() {
            this.loadData()
        })
    }
}