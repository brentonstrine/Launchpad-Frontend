import axios from 'axios';

const BASEL_URL = 'https://launchpad-e84b3.firebaseio.com/comments.json';

/**
 * This function gets the comments database from Firebase. 
 * We are returning the data in a comments object.  If we
 * are experiencing any trouble, the console log will display
 * any needed errors.
 */

const getRemoteComments = async () => {
    try {
        const res = await axios.get(`${BASEL_URL}`);
        const comments = res.data;
        
        return comments;
    } catch(e) {
        console.error(e);
    }
};

/**
 * This function creates our HTML message structure.
 * It takes the function and breaks down the name, message, and date
 * into a readable format for the front end.
 */

const getCommentHTML = comment => {
    return `<div class="comment">
    <div class="meta">
    <div class="user">${comment.username}</div>
    <div class="time">${comment.time}</div>
    <div class="message">${comment.message}</div>
    </div>
    </div>`;
};

/**
 * Let's add our comment to the DOM (Document Object Model).
 * First let's grab the comments and add them to a mutable
 * variable called let.  This variable is an empty string because
 * we are going to add to it once we take each comment by it's
 * ID, create it with getCommentHTML() and return the results
 * to holdComments for each comment that has returned from 
 * the API/Database.
 */

const addCommentsToDOM = comments => {
    let holdComments = '';

    Object.keys(comments).forEach((commentId) => {

        const fullMessage = comments[commentId];
        const commentHTML = getCommentHTML(fullMessage);

        holdComments+= commentHTML;

    });


    /**
     * Let's create a message div and find the ID in our HTML
     * called #meta and add the new comments we've just created
     * above.
     */
    const div = document.querySelector('#chat');
    div.innerHTML = holdComments;
};

/**
 * Let's add the new comments by using the GET call from
 * getRemoteComments, and wait for the new comments to appear
 * in the DOM.
 */

const main = async () => {
    addCommentsToDOM(await getRemoteComments());
};

main();

/**
 * When you are sending a message to the API and then
 * storing it to the database, we want to get the value
 * of the input field for the username, get the value
 * of the message and the time the message was sent.
 * Once we have that, let's craft a comment with those things
 * to send back to the API.  Let's wait after we use addComment
 * to make sure no one else is using the put method and get 
 * the remote message. The API/database is the source of truth.
 */

const form = document.querySelector('form');
const formEvent = form.addEventListener('submit', async event => {
    event.preventDefault();

    // Handle the time a user posts a message by using the current time
    const date = new Date();
    const postedTime = date.toLocaleTimeString();

    const time = postedTime;
    const username = document.querySelector('#new-comment__username').value;
    const message = document.querySelector('#new-comment__message').value;

    const comment = {
        username,
        message,
        time
    };

    const addedComment = await addComment(comment);
    await addCommentsToDOM(addedComment); // wait to fire off add comments before getting
    document.getElementById('form').reset(); // clears input fields after comments are submitted
    addCommentsToDOM(await getRemoteComments());
});

/**
 * Let's take our newly crafted message and post it
 * to the API/database using async.  If this does not work,
 * let's return an error in the console.log.
 */

export const addComment = async comment => {
    try {
        const res = await axios.post(`${BASEL_URL}`, comment);
        const addedComment = res.data;

        return addedComment;
    } catch (e) {
        console.error(e);
    }
};
