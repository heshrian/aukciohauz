'use strict';
const select = document.querySelector('select');
const ul = document.querySelector('ul');
const formBid = document.querySelector('.bid');
const formInput = document.querySelector('.new');
const bider = document.getElementById('name');
const bid = document.getElementById('amount');
const btn = document.querySelector('button')
// const dog = document.getElementById('Dog')

window.onload = function loadData() {
  fetch('/api/items')
    .then(response => response.json())
    .then(response => {
      response.forEach(e => {
        let option = document.createElement('option');
        option.textContent = e.title;
        option.value = e.id;
        select.appendChild(option);
        let liElem = document.createElement('li');
        liElem.textContent = `${e.title}(highest bid: ${e.highestBid}, ${e.highestBidderName})`;
        ul.appendChild(liElem);
      })
    })
}

// form.addEventListener('submit', e => {
//   e.preventDefault();
//   const xhr = new XMLHttpRequest();
//   xhr.responseType = 'json';
//   xhr.onreadystatechange = () => {
//     if (xhr.readyState === XMLHttpRequest.DONE) {
//       if (xhr.status >= 200 && xhr.status < 300) {
//         form.reset();
//         let pElem = document.createElement('p');
//         pElem.textContent = response.message;
//         document.querySelector('body').appendChild(pElem);

//       } else {
//         alert('some error handling');
//       }
//     }
//   }
//   xhr.open('POST', `/api/items/${select.value}`);
//   xhr.setRequestHeader('Content-Type', 'application/json');
//   xhr.send(JSON.stringify({ id: select.value, name: bider.value, amount: bid.value }));
// })

formBid.addEventListener('submit', e => {
  e.preventDefault();
  fetch(`/api/items/${select.value}/bids`, {
    method: 'POST',
    body: JSON.stringify({ id: select.value, name: /*dog*/bider.value, amount: bid.value }),
    headers: {
      'Content-type': 'application/json'
    }
  }).then(response => response.json())
    .then(response => {
      if (document.querySelector('p')) {
        document.querySelector('body').removeChild(document.querySelector('p'));
        let pElem = document.createElement('p');
        pElem.textContent = response.message;
        document.querySelector('body').appendChild(pElem);
      } else {
        let pElem = document.createElement('p');
        pElem.textContent = response.message;
        document.querySelector('body').appendChild(pElem);
      }
      if (response.message === 'Success! oh yeah') {
        window.location.reload();
      }
    });
})

formInput.addEventListener('submit', e => {
  e.preventDefault();
  fetch(`api/items/new`, {
    method: 'POST',
    body: JSON.stringify({ title: document.getElementById('item').value, expiryDate: document.getElementById('expiryDate').value, highestBid: document.getElementById('highestBid').value }),
    headers: {
      'Content-type': 'application/json'
    }
  }).then(response => response.json())
    .then(response => {
      console.log(document.getElementById('item').value, document.getElementById('expiryDate').value, document.getElementById('highestBid').value)
      if (response.message === 'a-ok') {
      }
      window.location.reload();
    })
})
btn.addEventListener('click', e => {
  // e.preventDefault();
  fetch('api/items/delete', {
    method: 'DELETE',
    body: JSON.stringify({ id: select.value }),
    headers: {
      'Content-type': 'application/json'
    }
  }).then(response => response.json())
    .then(response => {
      if (response.message === `deleted`) {
        window.location.reload();
      }
    })
})


function check() {
  console.log(select.value)
}