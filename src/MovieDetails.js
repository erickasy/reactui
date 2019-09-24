import React from 'react';

class MovieDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            language: [],
            pic: []
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        fetch(`https://cdn-discover.hooq.tv/v1.2/discover/titles/${this.props.match.params.id}`) ///e6464ce6-42c9-43ae-be23-0dd57f50add1')
            .then(res => res.json())
            .then((x) => {
                this.setState({
                    title: x.data.title,
                    desc: x.data.description,
                    sdesc: x.data.short_description,
                    as: x.data.as,
                    language: x.data.languages,
                    ageR: x.data.meta.ageRating,
                    yr: x.data.meta.releaseYear,
                    pic: x.data.images
                })
                console.log(x);
            }).catch(console.log)
    }

    render() {
        return (
            <section className="wrapper">
                <div className="container-fostrap">
                    <div>
                        <h1 className="heading">
                            {this.state.as}
                        </h1>
                    </div>
                    <div className="content">
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-12 col-sm-4">
                                    <div className="card">
                                        {this.state.pic.filter(m => m.type === 'ORIGINAL').map((n) => (
                                            <img key={n.id} id={n.id} className="img-card" src={n.url} alt={this.state.title}></img>
                                        ))}
                                        <div className="card-content">
                                            <h4 className="card-title">
                                                {this.state.title}
                                            </h4>
                                            <p>{this.state.sdesc}</p>
                                        </div>
                                        <div className="card-read-more">
                                            <a href={window.location.origin} className="btn btn-link btn-block">GO BACK</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-4">
                                    <div className="card">
                                        <div className="card-content">
                                            <p>{this.state.desc}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-4">
                                    <div className="card">
                                        <div className="card-content">
                                            <h4 className="card-title">Languages:</h4>
                                            {this.state.language.map((t) => (
                                                <p key={t}>{t}</p>
                                            ))}
                                        </div>
                                        <div className="card-read-more">
                                            <h4><p>
                                                Rating :  <span className="card-notify-badge">{this.state.ageR}</span></p>
                                                <p>
                                                    Release :  <span className="card-notify-badge">{this.state.yr}</span></p>
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default MovieDetails