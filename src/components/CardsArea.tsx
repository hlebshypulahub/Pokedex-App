import React, { Component } from "react";
import Card from "./Card";
import Spinner from "./Spinner";
import { connect } from "react-redux";

import Poke from "../interfaces/Poke";

import "./CardsArea.scss";
import "./Card.scss";

interface IState {
    pokes: Array<Poke>;
    pokesFetching: boolean;
    pagesLoaded: number;
    nameFilter: string;
    typeFilter: string;
}

class CardsArea extends Component<{ theme: boolean }, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            pokes: new Array<Poke>(),
            pokesFetching: true,
            pagesLoaded: 0,
            nameFilter: "",
            typeFilter: "",
        };

        this.loadPokes = this.loadPokes.bind(this);
    }

    componentDidMount() {
        const getPokes = async () => {
            const requests = await this.fetchPokes();

            this.processPokes(requests);
        };

        getPokes();
    }

    processPokes(requests: any) {
        Promise.all(requests)
            .then((responses) =>
                Promise.all(responses.map((response) => response.json()))
            )
            .then((pokes) =>
                pokes.map(({ name, types, sprites, weight, height }) => ({
                    url: "",
                    name,
                    type: types.map((t: any) => t.type.name).join(", "),
                    sprite: sprites.front_shiny,
                    weight,
                    height,
                }))
            )
            .then((newPokes) =>
                this.setState({
                    pokes: [...this.state.pokes, ...newPokes],
                    pokesFetching: false,
                    pagesLoaded: this.state.pagesLoaded + 1,
                })
            );
    }

    fetchPokes() {
        const getPokes = async () => {
            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${
                    this.state.pagesLoaded * 20
                }`
            );

            const data = await response.json();
            const pokes = data.results;
            const urls = pokes.map((p: Poke) => p.url);
            return urls.map((url: string) => fetch(url));
        };

        return getPokes();
    }

    loadPokes = () => {
        const getPokes = async () => {
            const requests = await this.fetchPokes();

            this.processPokes(requests);
        };

        this.setState({ pokesFetching: true });
        getPokes();
    };

    handleChange(e: any) {
        this.setState({ [e.target.name]: e.target.value } as Pick<
            IState,
            keyof IState
        >);
    }

    render() {
        const { pokes, pokesFetching, nameFilter, typeFilter } = this.state;

        const theme = this.props.theme;

        const filteredPokes = pokes
            .filter((p) => p.name.startsWith(nameFilter))
            .filter((p) =>
                p.type
                    .split(",")
                    .map((s) => s.trim())
                    .some((s) => s.startsWith(typeFilter))
            );

        const loadMoreButton = (
            <div className="Card" onClick={() => this.loadPokes()}>
                {pokesFetching ? (
                    <div className="pos-center-in-button">
                        <Spinner />
                    </div>
                ) : (
                    <div className="load-more">Load More »</div>
                )}
            </div>
        );

        return (
            <div className="CardsArea">
                {pokes.length === 0 ? (
                    <div className="pos-center">
                        <Spinner />
                    </div>
                ) : (
                    <>
                        <div className="inputs">
                            <label>
                                Name:
                                <input
                                    className={`${
                                        theme ? "light-theme" : "dark-theme"
                                    }`}
                                    type="text"
                                    value={nameFilter}
                                    name="nameFilter"
                                    onChange={(e) => this.handleChange(e)}
                                />
                            </label>
                            <label>
                                Type:
                                <input
                                    className={`${
                                        theme ? "light-theme" : "dark-theme"
                                    }`}
                                    type="text"
                                    value={typeFilter}
                                    name="typeFilter"
                                    onChange={(e) => this.handleChange(e)}
                                />
                            </label>
                        </div>
                        <div className="Cards">
                            {filteredPokes.map((p: Poke) => (
                                <Card key={p.sprite} poke={p}></Card>
                            ))}
                            {loadMoreButton}
                        </div>
                    </>
                )}
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    const theme = state.theme;
    return {
        theme,
    };
}

export default connect(mapStateToProps)(CardsArea);
