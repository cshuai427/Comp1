import React, {Component} from 'react';

class EventPostPage extends Component{
    render() {
        return (
            <div className="App-middle">
                <h3>Post Meetup Events</h3>
                <form method="post">
                    <h3>Your event title</h3>
                    <input type="text" defaultValue="Type your event title here" />
                    <button> Confirm</button>
                    <h3>Please pick your date</h3>
                    <br />
                        <br />
                            <br />
                                <br />
                        <h3>Please pick your time</h3>
                    <h4>Begin
                        <select>
                        <option value ="time">1 pm</option>
                        <option value ="time">2 pm</option>
                        <option value="time">3 pm</option>
                        <option value="time">4 pm</option>
                    </select> End
                        <select>
                        <option value ="time">1 pm</option>
                        <option value ="time">2 pm</option>
                        <option value="time">3 pm</option>
                        <option value="time">4 pm</option>
                    </select>
                    </h4>
                    <h4>Please pick your location
                        <select>
                        <option value ="rule">Unselected</option>
                        <option value ="rule">PF</option>
                        <option value="rule">SF</option>
                        <option value="rule">SG</option>
                        <option value="rule">PG</option>
                        <option value="rule">C</option>
                    </select>
                    </h4>
                    <h4>How many people will go?<
                        select>
                        <option value ="joinNuumber">2</option>
                        <option value ="joinNuumber">3</option>
                        <option value="joinNuumber">4</option>
                        <option value="joinNuumber">5</option>
                        <option value="joinNuumber">more</option>
                    </select>
                    </h4>
                    <h4>Do you have baskerball? <button>Yes </button> <button>No </button></h4>

                    <input type="submit" value="Submit" />
                </form>

            </div>
        )
    }
}

export default EventPostPage;