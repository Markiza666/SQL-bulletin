import express from "express";
const app = express();
const port = 3000;

// Import router modules
import usersRouter from './routes/users.js';
import channelsRouter from './routes/channels.js';
import subscriptionsRouter from './routes/subscriptions.js';
import messagesRouter from './routes/messages.js';

// Middleware to parse JSON
app.use(express.json());

// Connect main URLs to their respective router modules
app.use('/users', usersRouter);
app.use('/channels', channelsRouter);
app.use('/subscriptions', subscriptionsRouter);
app.use('/messages', messagesRouter);

app.listen(port, () => {
    console.log(`API-servern körs på http://localhost:${port}`);
});
