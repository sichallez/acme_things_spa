// console.log('hello world');

//const axios = require('axios');

const ul = document.querySelector('ul');

ul.addEventListener('click', async(ev) => {
    
    if (ev.target.tagName === 'LI') {
        const id = ev.target.getAttribute('db-id');
        await axios.delete(`/api/things/${id}`);
        // console.log(typeof id, id);
        init();
    }
    // console.log(ev.target.tagName);
});

const init = async() => {
    
    const content = await axios.get('/api/things');
    const li = `${content.data.map(elem => `
        <li db-id='${elem.id}'>${elem.name}</li>`).join('')}`;
    ul.innerHTML= li;
    // console.log(content.data);
    // console.log(li);

    // const list = document.getElementsByTagName('li');
    //console.log(list);
    
};

init();

