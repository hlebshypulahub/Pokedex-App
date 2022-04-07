import React, { Component, memo } from "react";

import Poke from "../interfaces/Poke";

import "./Card.scss";

const Card = memo(
    class Card extends Component<
        { poke: Poke },
        {
            poke: Poke;
        }
    > {
        state = {
            poke: this.props.poke,
        };

        render() {
            const { name, type, sprite, weight, height } = this.state.poke;

            return (
                <div className="CardGrid Card">
                    <div>
                        <div>
                            Name: <span>{name}</span>
                        </div>
                        <div>
                            Type: <span>{type}</span>
                        </div>
                        <div className="add-info">
                            <div>
                                Height: <span>{height}</span>
                            </div>
                            <div>
                                Weight: <span>{weight}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <img src={sprite} alt={name} />
                    </div>
                </div>
            );
        }
    }
);

export default Card;
