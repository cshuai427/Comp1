import React, {Component} from 'react';

class Comment extends Component{
    render() {
        return (
            <div className="App-middle">
                <h1>Basketball Meetup Events</h1>
               <form method="get">
                   <img src="/" width="50%" height="50%" />
                <ul>
                    <li>
                        Saturday Event
                    </li>
                    <li>
                        12:00-14:00
                    </li>
                    <li>
                        Location: Central Park Number of People: 3 Has Basketball: Yes
                    </li>
                    <li>
                        Who will go: <img src="/" alt="tom" /> <img src="/" alt="peter" />
                    </li>
                </ul>
                   <p>Hello everyone, this Saturday I will play basketball at central. Anyone has time could join me. Welcome to join us. We will take basketball. So no worries about the balls. New players are welcome......</p>
               </form>
                <form method="post">
                    <div>
                    <h2>Are you going to this event? <button type="submit"> Yes </button><button type="submit"> No </button></h2>
                    </div>
                </form>
                <form method="post">
                    <div>
                        <tr>
                            <td>
                        <h3><img src="/" alt="avatar" /> Alex </h3>
                            </td>
                            <td>

                            </td>
                        </tr>

                        <input type="text" defaultValue=" Type your message here to reply" />
                        <button type="submit"> Reply </button>

                    </div>

                </form>

            </div>
        )
    }
}

export default Comment;