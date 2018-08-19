import React, { Component } from 'react';

class HomeEventPage extends Component {

    render(){
        return(

                <div className="App-middle">

                    <h1>Basketball Meetup Events</h1>
                    <div>
                    <form method="get">
                        <img src="/" width="50%" height="20%"  />
                        <h3>Saturday Event</h3>
                        <p>Hello everyone, this Saturday I will play basketball at central. Anyone has time could join me. Welcome <a ref="/event/commit"> View</a></p>
                        <hr/>
                        <h3>Sunday Event</h3>
                        <p>Hello everyone, this Saturday I will play basketball at central. Anyone has time could join me. Welcome<a ref="/event/commit"> View</a></p>
                        <hr/>
                        <img src="/" width="50%" height="20%"  />
                        <h3>Saturday Event</h3>
                        <p>Hello everyone, this Saturday I will play basketball at central. Anyone has time could join me. Welcome <a ref="/event/commit"> View</a></p>
                        <hr/>
                    </form>
                    </div>

                </div>



        );
    }

}
export default HomeEventPage;