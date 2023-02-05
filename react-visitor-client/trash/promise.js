// 1.Producer
// when new Promise is created, the executor runs automatically
const promise = new Promise((resolve, reject) => {
    console.log('doing something...');
    setTimeout(() => {
        resolve('hjw resolve');
        reject('hjw reject');
    }, 2000);
});

// 2. Consumers: then, catch, finally
promise
    .then(value => {
        console.log(value);
    })
    .catch(error => {
        console.log(error);
    })
    .finally(() => {
        console.log('finally');
    });

// 3. Promise chaining
const fetchNumber = new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000);
});

fetchNumber
    .then(num => num * 2)
    .then(num => num * 3)
    .then(num => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(num - 1);
            }, 1000);
        })
    })
    .then(num => console.log(num));

// 4. Error Handling
const getHen = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('닭');
        }, 1000);
    });
const getEgg = hen =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`${hen} => 알`);
        }, 1000);
    });
const cook = egg =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`${egg} => 후라이`);
        }, 1000);
    });

getHen()
    .then(getEgg)
    .then(cook)
    .then(console);