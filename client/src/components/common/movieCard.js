import React, { Component } from 'react'
import noPosterIMG from '../../images/noposter.jpg';


 class MovieCard extends Component {
    state = { 
        liked: false 
    }
    componentWillReceiveProps(props) {
        const { liked, movie } = props;
        if(movie._id === "5cc95c4940903924318b619d") console.log(liked)
        this.setState({ liked, movie });
    }
    componentWillMount(){
        const { liked, movie } = this.props;
        if(movie._id === "5cc95c4940903924318b619d") console.log(liked)
        this.setState({ liked, movie });
    }

    render() {
        const { ToggleFavouriteCard } = this.props;
        const { liked, movie } = this.state;
        const { title, rate, genre, image, description, _id } = movie;

        let encodedImage = new Buffer(image.data, 'binary').toString('base64');
        var coverImage = 'data:image/jpeg;base64,' + encodedImage;
        return (
            <div onClick={() => ShowCard(_id)} id={_id} className="card-container col-lg-3 col-md-4">
                <div className="thecard">

                    <div className="front-card">
                        <img src={coverImage ? coverImage : noPosterIMG} alt="coverImage"/>
                        <span>{rate}</span>
                    </div>

                    <div className="back-card">
                        <span> 
                            <i onClick={() => ToggleFavouriteCard(_id)} className={liked ? "fas fa-heart fa-2x": "far fa-heart fa-2x"}  />
                        </span>

                        <h5>About</h5>
                        <p>{description}</p>
                    </div>
                </div>      

                <div className="details">
                    <p>{title}</p>
                    <small>{genre}</small>
                </div> 
            </div>
        )
    }
}

 
const ShowCard = cardID => {
    const card = document.getElementById(`${cardID}`);
    card.classList.toggle('show-card');
}


export default MovieCard;