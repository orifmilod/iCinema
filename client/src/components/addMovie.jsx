import React from 'react';
import Form from './common/form';
import Joi from '@hapi/joi';
import Axios from 'axios';
import Input from './common/input';
import Select from './common/select';
class AddMovieForm extends Form {
    constructor() {
        super();
    }
    state = {
        data:{
            title:"",
            genre:"",
            numberInStock:"",
            dailyRentalRate:"",
            coverImage: null
        },
        genres:[],
        errors:{}
    }

    schema = {
        id: Joi.string(),
        title: Joi.string().required().label("Title"),
        genre: Joi.string().required().label("Genre"),
        numberInStock: Joi.number().min(0).required().label("Number In Stocks"),
        dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
        coverImage: Joi.required().label("Cover Image")
    }

    //Overriding handleSubmit method
    handleSubmit = (e) => {
        super.handleSubmit(e);
    
        Axios
        .post('/api/movies/addmovie', this.state.data)
        .then(result => { 
            console.log(result);
            this.props.history.push("/movies"); 
        })
        .catch(error => console.error(error))
    }

    async componentDidMount()
    {
        Axios.get('/api/genres')
        .then(docs => this.setState({ genres: docs.data }))
        .catch(err => console.error(err));
    }

    render() {
        const { errors } = this.state;
        const { title, genre, numberInStock, coverImage } = this.state.data;
        
        //Restructuring genres object
        const _genres = [];
        this.state.genres.forEach((element) => _genres.push({ _id: element._id, value: element.genre }));
        
        return ( 
            <div className="background-container">
                <div className="container">
                    <h1 className="main-header">Add a new movie</h1>
                    <form onSubmit={this.handleSubmit}>
                    <Input 
                        name="title"
                        value={title}
                        label="Title"
                        onChange={this.handleChange}
                        placeholder="Enter the title..."
                        error={errors["title"]}
                        iconClass="fas fa-film"
                        autoFocus
                    />
                    <Select
                        name="genre"
                        label="Genre"
                        onChange={this.handleChange}
                        value={genre}
                        error={errors["genre"]}
                        options={_genres}
                    />
                    <Input 
                        name="numberInStock"
                        label="Number In Stock"
                        onChange={this.handleChange}
                        placeholder="Enter the stock..."
                        error={errors["numberInStock"]}
                        iconClass="fas fa-hashtag"
                        value={numberInStock}
                        type="number"
                    />
                    <Input 
                        name="coverImage"
                        label="Cover Image"
                        onChange={this.handleChange}
                        error={errors["coverImage"]}
                        iconClass="fas fa-file-image"
                        accept="image/*"
                        value={coverImage}
                        type="file"
                    />
                    <button type="submit" className="btn special-btn" disabled={this.validate()}>
                        Add movie
                    </button>
                </form>
                </div>
            </div>
        );
    }
}
export default AddMovieForm;