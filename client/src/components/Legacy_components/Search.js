import React, {Component} from 'react';

class Search extends Component {

    state = {
        inputText: '',
    }

    onSearch = () => {
        if(this.state.inputText !== ''){
            this.props.onSearch(this.state.inputText);
        }else{
            console.log("nothing to Search");
        }
    }

    clearSearch = () => {
        this.setState({ inputText : '' }, () => {
            this.props.onSearch(this.state.inputText);
        }); 
    }

    onInputChange = (e) => {
        this.setState({ inputText: e.target.value });
    }

    render(){
        return (
            <div className="ui action input">
                <input type="text" placeholder="Search..." value={this.state.inputText} onChange={(e) => this.onInputChange(e)} />
                <button className="ui icon button" onClick={this.clearSearch} >
                    <i className="delete icon"></i>
                </button>
                <button className="ui icon button" onClick={this.onSearch} >
                    <i className="search icon"></i>
                    Search
                </button>
            </div>
        );
    }

}

export default Search;