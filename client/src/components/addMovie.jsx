import React from 'react';
import Form from './common/form';
import Joi from '@hapi/joi';
import Input from './common/input';
import Select from './common/select';

import { connect } from 'react-redux';
import { AddMovie } from '../actions/moviesAction';
import Axios from 'axios';

class AddMovieForm extends Form {
    constructor() {
        super();
    }
    state = {
        data:{
            title:"",
            genre:"",
            numberInStock:"",
            image: null,
        },
        genres:[],
        errors:{}
    }

    schema = {
        id: Joi.string(),
        title: Joi.string().required().label("Title"),
        genre: Joi.string().required().label("Genre"),
        numberInStock: Joi.number().min(0).required().label("Number In Stocks"),
        image: Joi.object().allow(null).label("Cover Image"),
    }

    //Overriding handleSubmit method
    handleSubmit = (e) => {
        super.handleSubmit(e);
        this.props.AddMovie(this.state.data);
    }
    uploadImage = e => {
        if(e.target.files[0]) {    
            // const imageFile = URL.createObjectURL(e.target.files[0]);
            const data = {...this.state.data}
            // data["imageURL"] = imageFile;
            data["image"] = e.target.files[0];
            this.setState({ data });
        }
    }
    async componentDidMount()
    {
        Axios.get('/api/genres')
        .then(docs => this.setState({ genres: docs.data }))
        .catch(err => console.error(err));
    }

    render() {
        const { errors } = this.state;
        const { title, genre, numberInStock } = this.state.data;
        
        //Restructuring genres object
        const _genres = [];
        this.state.genres.forEach((element) => _genres.push({ _id: element._id, value: element.genre }));
        
        return ( 
            <div className="background-container">
                <div className="container">
                    <h1 className="main-header">Add a new movie</h1>
                    <form onSubmit={this.handleSubmit} encType="multipart/form-data" >
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
                            name="image"
                            label="Cover Image"
                            onChange={this.uploadImage}
                            error={errors["coverImage"]}
                            iconClass="fas fa-file-image"
                            accept="image/*"
                            type="file"
                        />
                        {this.renderSubmitButton('Add Movie')}
                        {/* <button type="submit" className="btn special-btn" disabled={this.validate()}>
                            Add movie
                        </button> */}
                    </form>
                </div>
            </div>
        );
    }
}
const mapDispatchToProps = (dipatch) => {
    return {
        AddMovie: (movie) => dipatch(AddMovie(movie))
    }
}

export default connect(null, mapDispatchToProps) (AddMovieForm);