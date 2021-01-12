import server from './app/server';

server.start(({ port }) => {
  console.log(`🚀 Server ready at: http://localhost:${port}`);
});
