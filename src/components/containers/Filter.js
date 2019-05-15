import React, {Component} from 'react';

class Filter extends Component {
    render(){
        return (
            <div className="">
                <div className="ui secondary large buttons">
                    <button className="ui button" onClick={() => this.props.sortBy('key')}>ID <i className="sort icon"></i></button>
                    <button className="ui button" onClick={() => this.props.sortBy('name')}>Name <i className="sort icon"></i></button>
                    <button className="ui button" onClick={() => this.props.sortBy('level')}>Level <i className="sort icon"></i></button>
                    <button className="ui button" onClick={() => this.props.sortBy('status')}>Status <i className="sort icon"></i></button>
                </div>
            </div>
        );
    }

}

export default Filter;