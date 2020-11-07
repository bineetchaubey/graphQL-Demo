const _  =  require('lodash');
const { PubSub } = require('apollo-server');
const pubsub = new PubSub();
const { withFilter }  = require('apollo-server');

const TOPIC = 'infoTopic';
const MESSAGE_ADDED_TOPIC = 'messageAdded';

const infos = ['info1', 'info2', 'info3', 'done']

const publish = () => {
    setTimeout( () =>
    infos.forEach(info => pubsub.publish(TOPIC, {info})), 1000)
}


const courses = [
  {
      id: 1,
      title: 'The Modern GraphQL Bootcamp',
      author: 'Andrew Mead',
      description: 'Learn how to build GraphQL applications using Node.js. Includes Prisma, authentication, Apollo Client, and more!',
      url: 'https://codingthesmartway.com//courses/graphql-bootcamp/'
  },
  {
      id: 2,
      title: 'NodeJS - The Complete Guide (incl. MVC, REST APIs, GraphQL)',
      author: 'Maximilian Schwarzmüller',
      description: 'Master Node JS, build REST APIs with Node.js, GraphQL APIs, add Authentication, use MongoDB, SQL & much more!',
      url: 'https://codingthesmartway.com/courses/nodejs-complete-guide/'
  },
  {
      id: 4,
      title: 'React - The Complete Guide (incl Hooks, React Router, Redux)',
      author: 'Maximilian Schwarzmüller',
      description: 'Dive in and learn React from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!',
      url: 'https://codingthesmartway.com/courses/react-complete-guide/'
  },
];


const singleCourse = {
  id: 4,
  title: 'React - The Complete Guide (incl Hooks, React Router, Redux)',
  author: 'Maximilian Schwarzmüller',
  description: 'Dive in and learn React from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!',
  url: 'https://codingthesmartway.com/courses/react-complete-guide/'
}


const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];



// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
    getCourse: () => courses,
    go: () => { publish(); return 'going'},
    getSingleCourse: (root,{id}) => {
      console.log('this is new india')
      console.log(id);
      return  _.find(courses,{'id':id})
      // return singleCourse;

    }
  },
  Mutation : {

    createMessage: (root,args,context,info) => {
      // Create a random id for our "database".
      // var id = require('crypto').randomBytes(10).toString('hex');
      // fakeDatabase[id] = input;
      // return new Message(id, input);
      // console.log(args.input,'ye kya hai');
      const messageAdded =  args.input
      pubsub.publish(MESSAGE_ADDED_TOPIC, {messageAdded})
      return messageAdded
    },
  },

  Subscription: {
    info: {
      subscribe: () => pubsub.asyncIterator([TOPIC]),
    },
    messageAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(MESSAGE_ADDED_TOPIC),
        (payload, args) => {
          console.log('what is comming', payload)
          return  args.userId == payload.messageAdded.userId // don't send to user creating message
        },
      ),
    },
  }
};

module.exports = resolvers