
const memory = document.body.getElementsByClassName('card');
// const memory =document.getElementsByClassName('card');

//将nodeList转化为列表
let array = Array.from(memory);
//
// for(let i=0; i<array.length; i++) {
//   array[i].
// }
let event =[];
let count = 0;
let count1 = 0;
let co = 0;
let matchSum = 0;
//如果在openArray()函数中声明该数组的话,不断调用该函数时，在该函数中"console.log(arrayOpen[2]);"的值
//只能输出一次，为什么？  ！！！不能再openArray()函数中才声明array Open数组，否则每次只能存储最后（最新）
//一次点击时的值

let arrayOpen = [];

let star = document.getElementsByClassName('fa-star');
let move = document.getElementsByClassName('moves');
let divCard = document.getElementsByClassName('container');
let popBox = document.getElementById('pop-box');






//说明：给定的shuffle 函数通过伪随机数的方式，对array中存储的card进行洗牌（打乱顺序）
//但是更新到界面上的效果是：每运行一次，array中相同索引存储的是不同的card值，看似洗牌成功
//可是每次运行shuffle之后，测试memory的值，card顺序没有变化，因此需要将array中的顺序
//重新写入memory中
function shuffle(array) {
  console.log("arrayOpen:"+arrayOpen);
  // console.log(memory);
  console.log(event);
    let currentIndex = array.length;
    let temporaryValue = 0
    let randomIndex = 0;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
        // console.log("array"+ currentIndex);
        // console.log(array[currentIndex]);
    }
    console.log(array);
    for (let i=0; i<array.length; i++) {
      // console.log("array"+ i)
      // console.log(array[i]);
      memory[i].outerHTML = array[i].outerHTML;
      //针对当用户点击一个卡片，之后点击reset
      memory[i].classList.value = "card";
      // console.log("memory"+ i);
      // console.log(memory[i]);
    }
    console.log(arrayOpen.length);
    co = 0;
    count=0;
    count1=0;
    matchSum=0;
    let move = document.getElementsByClassName('moves');
    //restart后，将moves置零
    move[0].textContent = 0;
    let star1 = document.getElementsByClassName('fa');
    console.log(star1);
    for (let i=0; i<3; i++) {
      star1[i].classList.value = "fa fa-star";
    }


    return memory;
}



// function getEventType(event) {
//   alert(event.type);
// }




// 点击之后，显示卡片
function showCard(event) {
  //将所点击的卡片的class值赋值给tags
  let tags = event.target.classList.value;
  //增加判断，避免多次点击同一卡片时，多次更新tags的值（即只在第一次点击时添加show）
  if (tags === 'card') {
    //给tags添加show类
    tags = tags + ' show';
    //连接到html中，更新html中该卡片的li-class值
    event.target.classList.value = tags;
    // //test代码
    // console.log(event.target.classList.value);
    // console.log(tags);
    //测试更新class值是否成功（为什么此时输出时open类已经添加成功？）
    // console.log(event.target);
  };

}

//
function openArray(event) {
  if (event.target.className === 'card show') {
    let tags = event.target.classList.value;
    tags = 'card open show';
    event.target.classList.value = tags;
    //增加计数，便于向数组中存入更新后的event.target
    count = count +1;
    // console.log(count);
    //设置点击次数计数，用于判断是否调用matchCard函数
    co =co +1;

    //设置数组的长度和页面卡片数组的长度相同（此时arrayOpen数组为空数组，但长度已经设置）
    // arrayOpen.length = array.length;
    //由于点击之后count的最小值为1，数组index需要从0开始，所以此处count-1
    arrayOpen[count-1] = event.target;
    // console.log(array.length);
    // console.log(arrayOpen.length);
    // console.log(arrayOpen);

  };

}



function judgeCard(event) {
//通过co的条件限制，每次调用judgeCard函数时，count的值为2的整数倍
  // console.log(arrayOpen[count-2],arrayOpen[count-1]);
  //console.log(arrayOpen);
  // if () {};


//使用count，确保比较的是每次最新的点击（不能只考虑索引0和1处的值）
  if (arrayOpen[count-2].firstElementChild.classList.value === arrayOpen[count-1].firstElementChild.classList.value) {
    console.log("match");
    console.log(arrayOpen[count-2],arrayOpen[count-1]);
//为什么此刻，arrayOpen中所点击的两个卡片class显示为match?（还没有调用更改class的match函数呀？）它是怎么写入的？
    console.log(arrayOpen);
    matchCard2(event);
    // matchCard1(event);
    // matchCard(event);
  }else {
    //延时调用notMatch，先让用户看清楚卡片的图形
    // setTimeout(notMatch,5);
    //不用延时也可以，因为开始的.ani中有0.1s的时间
    notMatch(event);
    // notMatch(event);
    console.log("yyyyy");
    // arrayOpen[0].classList.value = arrayOpen[1].classList.value= "card";
  }
  //
  co =0;
  //每进行一次配对比较，就记录一次
  count1+=1;
  //记录尝试配对的卡片的对数
  moveCard(event);
  starScore(event);

}




function moveCard(event) {
  // let move = document.getElementsByClassName('moves');
  console.log(move);
  console.log(event);
  // let content = move[0].textContent;
  // console.log(content);
  // onclick = document.getElementsByClassName('restart');
  // document.addEventListener('onclick', function() {
  //   count1=0;
  // });
  move[0].textContent = count1;
}


function matchCard2(event) {

  for (let i=count-2; i<count; i++) {
    arrayOpen[i].classList.value = "card match ani";
  }

  document.addEventListener('transitionend', function(event){
    console.log("Great Match!");
    for (i=count-2; i<count; i++) {
      arrayOpen[i].classList.value = "card match";
    }
  });

  matchSum+=1;
  console.log("matchSum:"+ matchSum);
  if (matchSum === 3) {
      setTimeout(pop,500);
  }


  // if (matchSum === 3) {
  //   console.log("You've finished the game!");
  //
  //   // let divCard = document.getElementsByClassName('container');
  //   console.log(divCard);
  //   divCard[0].style.cssText = "visibility: hidden";
  //   // con.style.cssText = "font-size: 1px";
  //   let starCount = document.getElementsByClassName('fa-star');
  //   let stCount = starCount.length;
  //
  //   // let popBox = document.getElementById('pop-box');
  //   popBox.style.cssText = "top:300px; left:500px; width:600px; height:300px; visibility: visible";
  //
  //   let popMessage1 = document.getElementsByClassName('pop-message1');
  //   popMessage1[0].style.cssText = " width:100%; font-size:1em; text-align:center";
  //
  //   popMessage1[0].textContent="With "+ matchSum + " Moves and "+ starCount.length+" Stars.";
  //
  //
  //   // console.log(popMessage1[0].innerText);
  //   // console.log(popBox.textContent);
  // }

}

//弹框
function pop() {
  // if (matchSum === 3) {
    console.log("You've finished the game!");

    // let divCard = document.getElementsByClassName('container');
    console.log(divCard);
    divCard[0].style.cssText = "visibility: hidden";
    // con.style.cssText = "font-size: 1px";
    let starCount = document.getElementsByClassName('fa-star');
    let stCount = starCount.length;

    // let popBox = document.getElementById('pop-box');
    // popBox.style.cssText = "top:300px; left:500px; width:600px; height:300px;
    popBox.style.cssText = "visibility: visible";
    // let popMessage = document.getElementsByClassName('pop-message');
    // popMessage[0].classList.value = "popmessage ani";

    let popMessage1 = document.getElementsByClassName('pop-message1');
    popMessage1[0].style.cssText = " width:100%; font-size:1em; text-align:center";

    popMessage1[0].textContent="With "+ matchSum + " Moves and "+ starCount.length+" Stars.";

}







function notMatch(event) {
  // window.setTimeOut(30s);
  for (let i=count-2; i<count; i++) {
    //当起始条件为i=count时，需要加判断条件
    // if (arrayOpen[i].classList.value !== "card match") {
      // console.log(arrayOpen[i].firstElementChild.classList.value);
      arrayOpen[i].classList.value = "card open show ani";
    // }
  }

  document.addEventListener('transitionend', function(event){
    console.log("Great!");
    for (i=count-2; i<count; i++) {
      arrayOpen[i].classList.value = "card";
    }
  });
}

//星级评分
function starScore(event) {
  console.log('startest');
  // let star = document.getElementsByClassName('fa-star');
  // if (count1 === 2) {
  //   console.log(con[0].classList.value);
  //   star[2].classList.value = "fa fa-star1";
  // // star[2].style.cssText = ":before{content = \f006}";
  // console.log(star);
  // }
  switch (count1) {
    case 2:star[2].classList.value = "fa fa-star1";break;
    case 6:star[1].classList.value = "fa fa-star1";break;
    case 7:star[0].classList.value = "fa fa-star1";
      break;
    default:console.log('dd');
  }
}



//play again 按钮，刷新游戏界面（并不是刷新整个web）
function playAgain(array) {
  shuffle(array);
  // let popBox = document.getElementById('pop-box');
  popBox.style.cssText = "visibility: hidden";
  divCard[0].style.cssText = "visibility: visible";
  console.log("pophiden test");
  document.addEventListener('click', ll);
}

function closeGame(array) {
  console.log("test close");
  popBox.style.cssText = "visibility: hidden";
  divCard[0].style.cssText = "visibility: visible";
  document.addEventListener('click', ll);

}







function ll(event) {
  // console.log(event.target.classList.value);
  // console.log(event.target.nodeName);
  // console.log(memory);
  // console.log(array);

  //加入判断语句，仅当点击卡片时，页面响应
  if (event.target.nodeName === "LI" || event.target.classList.value === "card") {
    showCard(event);
    openArray(event);
    console.log(count);
    console.log(co);
    // 仅当有两次点击时，判断卡片的状态；否则继续等待点击
    if (co === 2) {
      judgeCard(event);
      event.preventDefault();
    }else {
      document.addEventListener('click', ll);
    }
  }else if (event.target.classList.value === "fa fa-repeat") {
    console.log("test repeat");
    // console.log(array);
    shuffle(array);
    console.log("test!!!!");
  }


  // console.log(memory);
}





document.addEventListener('click', ll);
