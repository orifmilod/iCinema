import React, { Component } from 'react'
import FlippingCardFront from './CardFront';
import FlippingCardBack from './CardBack';
import './style.css';

 class MovieCard extends Component {
    state = { 
      liked: false 
    }
    componentWillReceiveProps(props) {
      const { liked, movie } = props;
      this.setState({ liked, movie });
    }
    componentWillMount() {
      const { liked, movie } = this.props;
      this.setState({ liked, movie });
    }
    render() {
      const { ToggleFavouriteCard } = this.props;
      const { liked, movie } = this.state;
      const { title, rate, genre, image, description, _id, trailerLink, movieLength } = movie;
      let encodedImage;
      if(image !== undefined)
        encodedImage = new Buffer(image.data, 'binary').toString('base64');
      var coverImage = 'data:image/jpeg;base64,' + encodedImage;
      return (
        <div className='card-container'>     
          <div className='card-wrapper' id={_id} onClick={() => FlipCard(_id)}>
            <FlippingCardFront 
              trailerLink={trailerLink}
              coverImage={coverImage}
              rate={rate}
              movieLength={movieLength}
              genre={genre}
              title={title}
            />
            <FlippingCardBack
              liked={liked}
              description={description}
              ToggleFavouriteCard={ToggleFavouriteCard}
            />
          </div>
        </div>
      )
    }
}
 
const FlipCard = cardID => {
  const card = document.getElementById(`${cardID}`);
  card.classList.toggle('flipped');
}

export default MovieCard;






// import React, { Component } from 'react'
// import noPosterIMG from '../../images/noposter.jpg';
// import { FlippingCard, FlippingCardBack,  FlippingCardFront} from 'react-ui-cards';

//  class MovieCard extends Component {
//     state = { 
//         liked: false 
//     }
//     componentWillReceiveProps(props) {
//         const { liked, movie } = props;
//         this.setState({ liked, movie });
//     }
//     componentWillMount(){
//         const { liked, movie } = this.props;
//         this.setState({ liked, movie });
//     }

//     render() {
//         const { ToggleFavouriteCard } = this.props;
//         const { liked, movie } = this.state;
//         const { title, rate, genre, image, description, _id } = movie;
//         let encodedImage;
//         if(image !== undefined)
//         encodedImage = new Buffer(image.data, 'binary').toString('base64');
//         var coverImage = 'data:image/jpeg;base64,' + encodedImage;
//         return (
//           <FlippingCard>
            
//             <FlippingCardFront>
//             <div className="front-card">
//                   <img src={image !== undefined ? coverImage : noPosterIMG} alt="coverImage"/>
//                   <span>{rate}</span>
//               </div>
              
//             </FlippingCardFront>
//             <FlippingCardBack>
//             <div className="back-card">
//                   <span> <i onClick={() => ToggleFavouriteCard(_id)} className={liked ? "fas fa-heart fa-2x": "far fa-heart fa-2x"} /> </span>
//                   <h5>About</h5>
//                   <p>{description}</p>
//               </div>
//             </FlippingCardBack>
//           </FlippingCard>
            
//         )
//     }
// }

 
// const ShowCard = cardID => {
//     const card = document.getElementById(`${cardID}`);
//     card.classList.toggle('show-card');
// }


// export default MovieCard;