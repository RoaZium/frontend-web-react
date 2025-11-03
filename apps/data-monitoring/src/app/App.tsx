import './App.css';

function App() {
  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'black',
        overflow: 'hidden',
      }}
    >
      <video
        controls
        autoPlay
        style={{
          width: 'calc(100% + 0px)',
          height: 'calc(100% + 160px)',
          marginTop: '-80px',
          objectFit: 'fill',
        }}
      >
        <source src="/video.mp4" type="video/mp4" />
        브라우저가 비디오를 지원하지 않습니다.
      </video>
    </div>
  );
}

export default App;
