const addOneBtn = document.getElementById('add-one');
const removeOneBtn = document.getElementById('remove-one');
const drawBadgeBtn = document.getElementById('draw-badge');
const resetBtn = document.getElementById('reset');
const playVideoBtn = document.getElementById('play-video');
const video = document.getElementById('video');
const drawRectProgressBtn = document.getElementById('rect-progress');
const drawCircleProgressBtn = document.getElementById('circle-progress');
let counter = 0

const demoFavoritos = new Favoritos({
  icon: {
    width: 140,
    height: 140,
  },
  badge: {
    fontSize: 60,
    minWidth: 80,
    minHeight: 80,
  },
  debug: {
    enabled: true,
  }
})

demoFavoritos.drawBadge(counter)

addOneBtn.addEventListener('click', () => {
  counter++;
  demoFavoritos.drawBadge(counter);
})

removeOneBtn.addEventListener('click', () => {
  counter--;
  demoFavoritos.drawBadge(counter);
})

drawBadgeBtn.addEventListener('click', () => {
  counter = 0;
  demoFavoritos.drawBadge('');
})


let videoRaf

const playVideoStep = () => {
  demoFavoritos.drawImage(video)
  videoRaf = requestAnimationFrame(playVideoStep)
}

const playVideo = () => {
  videoRaf = requestAnimationFrame(playVideoStep);
}

playVideoBtn.addEventListener('click', () => {
  video.play();
})

video.addEventListener('play',  playVideo)

resetBtn.addEventListener('click', () => {
  counter = 0;
  video.pause();
  cancelAnimationFrame(videoRaf)
  demoFavoritos.reset();
})

const drawCircle = () => {
  let root = document.documentElement;
  let scrollTopInPx = root.scrollTop;
  let pageHeightInPx = root.scrollHeight - root.clientHeight;
  let scrollPercent = (scrollTopInPx / pageHeightInPx) * 100;
  let scrollPercentRounded = Math.round(scrollPercent);

  demoFavoritos.drawProgressBar(scrollPercentRounded);
}

const drawRect = () => {
  let root = document.documentElement;
  let scrollTopInPx = root.scrollTop;
  let pageHeightInPx = root.scrollHeight - root.clientHeight;
  let scrollPercent = (scrollTopInPx / pageHeightInPx) * 100;
  let scrollPercentRounded = Math.round(scrollPercent);

  demoFavoritos.drawProgressBar(scrollPercentRounded);
}

drawCircleProgressBtn.addEventListener('click', () => {
  demoFavoritos.setOptions({
    icon: {
      shape: 'circle',
      lineWidth: 10,
    }
  })

  document.removeEventListener('scroll', drawRect)
  document.addEventListener('scroll', drawCircle)
})

drawRectProgressBtn.addEventListener('click', () => {
  demoFavoritos.setOptions({
    icon: {
      shape: 'rect',
      lineWidth: 10,
    }
  })

  document.removeEventListener('scroll', drawCircle)
  document.addEventListener('scroll', drawRect)
})




