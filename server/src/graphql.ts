import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLInt,
} from "graphql";

import { listings } from "./listings";

const Bookings = new GraphQLObjectType({
  name: "Bookings",
  fields: {
    bookings: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const Listing = new GraphQLObjectType({
  name: "Listing",
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    image: { type: new GraphQLNonNull(GraphQLString) },
    host: { type: new GraphQLNonNull(GraphQLString) },
    type: { type: new GraphQLNonNull(GraphQLString) },
    address: { type: new GraphQLNonNull(GraphQLString) },
    country: { type: new GraphQLNonNull(GraphQLString) },
    admin: { type: new GraphQLNonNull(GraphQLString) },
    city: { type: new GraphQLNonNull(GraphQLString) },
    bookings: { type: new GraphQLList(Bookings) },
    bookingsIndex: { type: new GraphQLNonNull(GraphQLInt) },
    price: { type: new GraphQLNonNull(GraphQLInt) },
    numOfGuests: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    listings: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Listing))),
      resolve: () => listings,
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    deleteListing: {
      type: new GraphQLNonNull(Listing),
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (_root, { id }) => {
        for (let i = 0; i < listings.length; i++) {
          if (listings[i]._id === id) {
            return listings.slice(i, 1)[0];
          }
        }

        throw new Error("Failed to delete listing");
      },
    },
  },
});

export const schema = new GraphQLSchema({ query, mutation });
