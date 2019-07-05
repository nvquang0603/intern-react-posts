import React, {Component} from 'react';

class Home extends Component {
    render() {
        return (
            this.props.listPosts.map(post => {
                return (

                            <div key={post.id} className="card" style={{width: '18rem'}}>
                                <div className="card-body">
                                    <h5 className="card-title">{post.title}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{post.active===true?'Active':'Inactive'}</h6>
                                    <p className="card-text">{post.content}</p>
                                    <a href="#" className="card-link">Card link</a>
                                    <a href="#" className="card-link">Another link</a>
                                </div>
                            </div>
                )
            })
        )
    }
}

export default Home;