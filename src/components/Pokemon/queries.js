import gql from 'graphql-tag';

const GET_POKEMONS_QUERY = gql`
  {
    pokemons(first: 20) {
      id
      name
      image
      classification
    }
  }
`;

// Want to play around with the data?
// I am going to show a better way soon, in the meantime, check out
// the current GraphiQL Schema to see what kind of data you need!
// Link: https://graphql-pokemon.now.sh/graphql
const GET_POKEMON_QUERY = gql`
  query getPokemon($id: String) {
    pokemon(id: $id) {
      weaknesses
      classification
      # What else do we need about the pokemon?
      # Did you read about Fragments?  This will become a Query Fragment
      # in the next session
    }
  }
`;

// Feel free to add this in anytime you would like just to see an error
const GET_AN_ERROR_QUERY = gql`
  {
    pokemons(first: 10) {
      id
      name
      image
      classification
      foobar # This better not exist!
    }
  }
`;

export { GET_POKEMONS_QUERY, GET_POKEMON_QUERY, GET_AN_ERROR_QUERY };
