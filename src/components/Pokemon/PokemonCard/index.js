import React, { Fragment } from 'react';
import {
  Box,
  Card,
  Flex,
  Modal,
  Button,
  List,
  Header,
} from '@procore/core-react';
import { Query } from 'react-apollo';

import { GET_POKEMON_QUERY } from '../queries';

const PokemonCardWrapper = props => (
  <Box margin="md">
    <Card variant="hoverable" style={{ width: '200px' }}>
      <Box padding="md">
        <Flex direction="column">
          <Modal.State>{props.children}</Modal.State>
        </Flex>
      </Box>
    </Card>
  </Box>
);

const PokemonCard = ({ id, name, image }) => (
  <PokemonCardWrapper>
    {({ isShowing, show, hide }) => (
      <div>
        <img
          alt={name}
          src={image}
          style={{ height: 75, width: 75, marginBottom: 10 }}
          onClick={show}
        />
        <h4 className="capitalize">{name}</h4>
        <Modal open={isShowing} onClickOverlay={hide} placement="top">
          {isShowing && (
            <Query query={GET_POKEMON_QUERY} variables={{ id }}>
              {({ loading, error, data }) => {
                if (loading) return <div />;
                if (error) return <div>{error}</div>;
                const { classification, weaknesses } = data.pokemon;

                return (
                  <Fragment>
                    <Modal.Header onClose={hide}>{name}</Modal.Header>
                    <Modal.Body>
                      <Flex direction="column">
                        <img
                          alt={name}
                          src={image}
                          style={{
                            height: 100,
                            width: 100,
                          }}
                        />
                        <Header type="h2">Classification</Header>
                        <p>{classification}</p>
                        <Header type="h2">Weaknesses</Header>
                        <List>
                          {weaknesses.map((w, i) => (
                            <List.Item key={i}>{w}</List.Item>
                          ))}
                        </List>
                      </Flex>
                    </Modal.Body>
                    <Modal.Footer>
                      <Modal.FooterButtons>
                        <Button variant="tertiary" onClick={hide}>
                          Cancel
                        </Button>
                        <Button variant="primary" onClick={hide}>
                          Add To Team
                        </Button>
                      </Modal.FooterButtons>
                    </Modal.Footer>
                  </Fragment>
                );
              }}
            </Query>
          )}
        </Modal>
      </div>
    )}
  </PokemonCardWrapper>
);

export default PokemonCard;
