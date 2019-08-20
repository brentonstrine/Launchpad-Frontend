import axios from 'axios';

const BASEL_URL = 'https://launchpad-e84b3.firebaseio.com/comments.json';

const getComments = async () => {
    try {
        const res = await axios.get(`${BASEL_URL}`);
        const comments = res.data;
        console.log(`GET: Here is the list of comments`, comments);

        return comments;
    } catch(e) {
        console.error(e);
    }
};

const commentLi = item => {
    const  li = document.createElement('li');

    li.appendChild(document.createTextNode(item.message));
    return li;
};

const addCommentsToDOM = comments => {
    const ul = document.querySelector('ul');

    if(Array.isArray(comments) && comments.length > 0) {
        comments.map(comment => {
            ul.appendChild(createLi(comment));
        });
    } else if (comments) {
        ul.appendChild(commentLi(comments));
    }
};

const main = async () => {
    addCommentsToDOM(await getComments());
};

main();


const form = document.querySelector('form');
const formEvent = form.addEventListener('submit', async event => {
    event.preventDefault();

    const time = Date.now();
    const username = document.querySelector('#new-comment__username').value;
    const message = document.querySelector('#new-comment__message').value;

    const comment = {
        username,
        message,
        time
    };

    const addedComment = await addComment(comment);
    addCommentsToDOM(addedComment);
});

export const addComment = async comment => {
    try {
        const res = await axios.post(`${BASEL_URL}`, comment);
        const addedComment = res.data;

        console.log('Added new comment', addedComment);

        return addedComment;
    } catch (e) {
        console.error(e);
    }
};
