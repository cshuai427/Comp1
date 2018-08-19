import React, { Component } from 'react';
import basketball1 from "../../Img/basketball1.jpeg";
import basketball2 from "../../Img/basketball2.jpeg";

class HomeEventPage extends Component {

    render(){
        return(

                <div className="App-middle">

                    <h1>Basketball Meetup Events</h1>
                    <div>
                    <form method="get">
                        <img src={ basketball1 } width="50%" height="20%"  />
                        <h3>Saturday Event</h3>
                        <p>Hello everyone, this Saturday I will play basketball at central. Anyone has time could join me. Welcome <a href="/"> View</a></p>
                        <hr/>
                        <h3>Sunday Event</h3>
                        <p>Hello everyone, this Saturday I will play basketball at central. Anyone has time could join me. Welcome<a href="/"> View</a></p>
                        <hr/>
                        <img src={ basketball2 } width="50%" height="20%"  />
                        <h3>Saturday Event</h3>
                        <p>Hello everyone, this Saturday I will play basketball at central. Anyone has time could join me. Welcome <a href="/"> View</a></p>
                        <hr/>
                    </form>
                    </div>

                </div>



        );
    }

}
export default HomeEventPage;