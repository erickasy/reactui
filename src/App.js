import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import MovieDetails from './MovieDetails';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tvshows: [],
      isShow: false
    };
  }

  componentDidMount() {
    fetch('https://cdn-discover.hooq.tv/v1.2/discover/feed?region=ID&page=1&perPage=20')
      .then(res => res.json())
      .then((x) => {
        this.setState({ tvshows: x.data.filter(y => y.type === 'Multi-Title-Manual-Curation') })
      })
      .catch(console.log)
  }

  render() {
    this.tvshows = this.state.tvshows;
    return (
      <Router>
        <div>
          <center><h1>List of Movies and TV Shows</h1></center>
          <Route path="/m/:id" component={MovieDetails} />
          {this.tvshows.map((t) => (
            <div className="card" key={t.row_id}>
              <div className="card-body">
                <h5 className="card-title">{t.row_name}</h5>
                <div className="container py-5">
                  <div className="row">
                    <div className="col-lg-7 mx-auto bg-white rounded shadow">
                      <div className="table-responsive">
                        <table className="table table-fixed">
                          <tbody>
                            {t.data.map((q) => (
                              <tr key={q.id}>
                                <td>
                                  {q.images.filter(m => m.type === 'POSTER').map((n) => (
                                    <Link to={`/m/${n.owner_id}`} key={n.owner_id}>
                                      <img id={n.owner_id} key={n.owner_id} className="card-img-top" src={n.url} alt={q.title} />
                                    </Link>
                                  ))}
                                  <p className="card-text">{q.title}</p>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Router>
    )
  }
}

export default App;
