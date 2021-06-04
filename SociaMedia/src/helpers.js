/**
 * Given a js file object representing a jpg or png image, such as one taken
 * from a html file input element, return a promise which resolves to the file
 * data as a data url.
 * More info:
 *   https://developer.mozilla.org/en-US/docs/Web/API/File
 *   https://developer.mozilla.org/en-US/docs/Web/API/FileReader
 *   https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
 * 
 * Example Usage:
 *   const file = document.querySelector('input[type="file"]').files[0];
 *   console.log(fileToDataUrl(file));
 * @param {File} file The file to be read.
 * @return {Promise<string>} Promise which resolves to the file as a data url.
 */

const API_URL = 'http://127.0.0.1:5000'

export function createElement(tag, data, options = {}) {
    const el = document.createElement(tag);
    el.textContent = data;
    // Sets the attributes in the options object to the element
    return Object.entries(options).reduce(
        (element, [field, value]) => {
            element.setAttribute(field, value);
            return element;
        }, el);
}

/**
 * Given a post, return a tile with the relevant data
 * @param   {object}        post 
 * @returns {HTMLElement}
 */
export function createPostTile(post) {
    const section = createElement('section', null, { class: 'post' });
    section.appendChild(createElement('h2', post.meta.author, { class: 'post-title' }));
    section.appendChild(createElement('img', null, 
        { src: '/images/'+post.src, alt: post.meta.description_text, class: 'post-image' }));
    return section;
}

// Given an input element of type=file, grab the data uploaded for use

export function uploadImage(event) {
    const [ file ] = event.target.files;
    return file
}

export function fileToDataUrl(event) {
    let file = event.target.files[0];
    const reader = new FileReader();
    var requestURL = API_URL+"/post/";
    var description = document.getElementById('PostDescr').value;
    reader.onload = () =>  {
        fetch(requestURL, {
            method: 'POST',
            body: JSON.stringify({
                description_text:description,
                src:reader.result.split(',')[1],
            }),headers: {
                'Content-Type': 'application/json',
                'Authorization': "Token "+ localStorage.getItem('token'),
            }
        }).then(response => {
            if (response.status == 200) {
                var mesg = document.getElementsByClassName('mesg')
                mesg[0].style.display = "inline";
                mesg[0].textContent = 'Adding Post Successfully';
                mesg[0].style.color = "green";
                window.setTimeout(() =>  {
                    window.location = "/index.html";
                },1000)
            } else if (response.status == 400) {
                var mesg = document.getElementsByClassName('mesg')
                mesg[0].style.display = "inline";
                mesg[0].textContent = 'Adding Post Unsuccessfully';
                mesg[0].style.color = "red";
            }
        });
    };
    reader.readAsDataURL(file);
}

export function VaildFile(file) {
    var f = uploadImage(file);
    const validFileTypes = [ 'image/jpeg', 'image/png', 'image/jpg' ]
    const valid = validFileTypes.find(type => type === f.type);
    // Bad data, let's walk away.
    if (!valid) {
        var mesg = document.getElementsByClassName('mesg')
        mesg[0].style.display = "inline";
        mesg[0].textContent = 'provided file is not a png, jpg or jpeg image.';
        document.getElementById('GreenTick').style.display = "none"
        return false
    }
    var mesg = document.getElementsByClassName('mesg')
    if (mesg[0].textContent == 'provided file is not a png, jpg or jpeg image.') {
        mesg[0].style.display = "none";
    }
    document.getElementById('GreenTick').style.display = "inline"
    return true
}

export function checkStore(key) {
    if (window.localStorage)
        return window.localStorage.getItem(key)
    else
        return null
}

/**
 * Given a parent node id, then append under the parent node
 * @param   {string}        id 
 * @param   {object}        child
 */
export function AppendChildById(id,child) {
    const parent = document.getElementById(id);
    parent.appendChild(child);
}


/**
 * Given a parent node id, then append under the parent node
 * @param   {object}        parent
 * @param   {array}          childList
 */
export function AppendAllChild(parent,childArray) {
    for (let i = 0; i < childArray.length; i++) {
        parent.appendChild(childArray[i]);
    }
}

