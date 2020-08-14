import React, {useState, useEffect, Fragment} from 'react';
import '../App.css';
import { Spin } from 'antd';
import TableComponent from '../components/Table';
import { IPosts, IParams } from '../types'

function Posts(): JSX.Element {
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<IPosts[]>([]);
    const [detail, setDetail] = useState<[]>([]);

    const query = (url:string) => {
        return fetch(`${'https://jsonplaceholder.typicode.com' + url}`)
            .then( res => res.json())
            .then((result) => result)
            .catch((err) => console.log('err', err))
    }

    const getData = async() => {
        let request = await query('/posts');
        setData(request)
    }

    useEffect( () => {
        getData()
        setLoading(false);
    },[]);

    const createTable = async (params:IParams) => {
        switch (params.name) {
            case 'id':
                let comments = await query(`${'/posts/' + params.id + '/comments'}`);
                setDetail(comments)
                break;
            case 'userId':
                let posts = await query(`${'/posts?userId=' + params.id}`);
                setDetail(posts)
                break;    
            default:
                break;
        }
    }

    return (
        <div>
            { loading ?
            <Spin tip="Loading..." />
            :
            <Fragment>
                <TableComponent data={data} columnsAction={["userId", "id"]} setQuery={createTable} />
                <br/>
                {detail.length > 0 &&  <TableComponent data={detail} columnsAction={[]} setQuery={createTable} />}
            </Fragment>
            }
        </div>
    );
}

export default Posts;