import "./App.css";
import React from "react";

function App() {
  return (
    <div>
      <PokeFinder></PokeFinder>
    </div>
  );
}

class PokeFinder extends React.Component {
  state = {
    dato: [],

    max: 151,
  };

  async componentDidMount() {
    var hola = [];
    for (let i = 1; i <= this.state.max; i++) {
      const dato = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      const datoF = await dato.json();
      console.log(datoF);
      let name = datoF.name;
      hola.push(name);
    }
    this.setState({ dato: hola });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.max !== this.state.max) {
      this.componentDidMount();
    }
  }

  render() {
    let arr2 = [];

    for (var i = 1; i <= this.state.max; i++) {
      arr2.push(i);
    }

    const numberOfPokemons = (e) => {
      e ? this.setState({ max: e }) : this.setState({ max: 151 });
    };

    return (
      <>
        <div className="container">
          <h1>Pokedex</h1>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              placeholder="Number of Pokemons"
              type="number"
              onChange={(e) => numberOfPokemons(e.target.value)}
            ></input>
            <button>Go!</button>
          </form>
          {arr2.map((e) => {
            let f;
            if (e < 10) {
              f = "00" + e;
            } else if (e >= 10 && e < 100) {
              f = "0" + e;
            } else {
              f = e;
            }

            let foto = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${f}.png`;
            return (
              <div className="pokeball" key={e}>
                <h5>#{f}</h5>
                <img
                  onClick={() =>
                    window.open(
                      `https://www.wikidex.net/wiki/${this.state.dato[e - 1]}`
                    )
                  }
                  className="poke"
                  src={foto}
                  alt={this.state.dato[e - 1]}
                />
                <p>{this.state.dato[e - 1]}</p>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

export default App;
