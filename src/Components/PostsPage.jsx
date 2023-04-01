import React, { useEffect, useState } from 'react'
import {Row, Col, Table, Button} from 'react-bootstrap'

const PostPage = () => {
    const [list, setList]=useState([]);
    const [loading, setLoading]=useState(false);
    const [page, setPage]=useState(1);
    const [last, setLast]=useState(1);

    const getPosts = () => {
        setLoading(true);
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(json => {
                console.log(json);
                let start=(page-1)*10+1;
                let end=(page*10);

                setList(json.filter(post=>post.id>=start && post.id<=end));
                setLast(Math.ceil(json.length/10));
                setLoading(false);
            })
    }

    useEffect(() => {
        getPosts();
    },[page]);

    if(loading) return <h1 className='text-center my-5'>로딩 중...</h1>
    return (
        <Row className='justify-content-center mx-3'>
            <Col md={10}>
                <h1 className='text-center my-5'>게시글</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr className='text-center'>
                            <td>ID.</td>
                            <td>Title</td>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map(post=> 
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                <td><div className='ellipsis'>{post.title}</div></td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <div className='text-center mx-3'>
                    <Button 
                    disabled={page===1 && true}
                    onClick={()=>setPage(page-1)}>이전</Button>
                    <span className='px-3'>{page} / {last}</span>
                    <Button 
                    disabled={page===last && true}
                    onClick={()=>setPage(page+1)}>다음</Button>
                </div>
            </Col>
        </Row>
    )
}

export default PostPage