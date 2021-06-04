import API from './api.js';
import {createElement, AppendAllChild} from './api.js';
import {ProductThumb,GenerateProductGrid,GenerateProductinList} from './global.js';
const api  = new API();

// show and hidde the chatbot
$(document).ready(function(){
    $(".chat_on").click(function(){
        $(".Layout").toggle();
        $(".chat_on").hide(300);
    });
    
    $(".chat_close_icon").click(function(){
        $(".Layout").hide();
           $(".chat_on").show(300);
    });
});

// chat API
function chat() {
    let form = document.getElementById('chatbot')
    let button = document.getElementById('messageButton')
    let messages = document.getElementsByClassName('Messages_list')[0]
    let text_list = []
    let message_input = ""
    let message_input_block = ""
    let message_output = ""
    let output = ""
    let message_output_block = ""
    let typing = ""
    let message_output_link = ""
    button.onclick = function () {
        let input = form.elements[0].value
        text_list.push(input)
        message_input_block = createElement('sp')
        message_input_block = createElement('div',"",{class:'message_input_block'})
        message_input = createElement('div',input,{class:'message_input'})
        AppendAllChild(message_input_block,[message_input])
        messages.appendChild(message_input_block)
        typing = createElement("p","Typing ...",{class:'typing'});
        api.ChatBot(text_list).then(res => {
            output = res[0]
            message_output_block = createElement('div',"",{class:'message_output_block'})
            messages.appendChild(typing)
            sleep(900).then(() => {
                // show the chatbot is typing and remove the chatbot is typing
                messages.childNodes[messages.childNodes.length-1].remove()
                if (res.length == 2) {
                    message_output = createElement('div',output + " Link: \n",{class:'message_output'})
                    message_output_link = createElement('a',"chatbot-recommendation.html",{class:'message_output_link',href:"chatbot-recommendation.html"})
                    AppendAllChild(message_output,[message_output_link])
                    AppendAllChild(message_output_block,[message_output])
                } else {
                    message_output = createElement('div',output,{class:'message_output'})
                    AppendAllChild(message_output_block,[message_output])
                }
                messages.appendChild(message_output_block)
            })
        })
        form.elements[0].value = ""
    }
}

// set a timer for chatbot
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

// 2 seconds
setInterval(chat(),2000)





