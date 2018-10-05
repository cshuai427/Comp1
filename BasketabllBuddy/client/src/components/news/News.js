import React, {Component} from 'react';
import axios from 'axios';

class News extends Component {

    constructor(props) {
        super(props);
        this.state = {
            news: {}
        }


    };


    componentWillMount(){
        var url = 'https://newsapi.org/v2/everything?sources=usa-today&q=nba&apiKey=eae65a64a2854c2ab4085b3ae9343e25';
        axios.get(url)
            .then(res =>
                res.data ? this.setState({news: res.data.articles}) : null);
    }

    render() {

        const { news } = this.state;

        let newItems;
        // newItems = news.map(newItem =>{
        //     return(<li>
        //
        //     </li>);
        // });

        return (
            <ul>
            </ul>
        );
    }
}

export default News;


