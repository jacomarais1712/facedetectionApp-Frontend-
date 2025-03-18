import { setState, useState, useEffect } from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation'
import Logo from '/src/components/logo/Logo'
import ImageLinkForm from '/src/components/imagelinkform/ImageLinkForm'
import Rank from './components/rank/Rank'
import FaceRecognition from '/src/components/facerecognition/FaceRecognition'
import ParticlesBg from 'particles-bg'
import MouseParticles from 'react-mouse-particles'
import SignIn from '/src/components/signin/SignIn'
import Register from '/src/components/register/Register'

function App() {
  const [input, setInput] = useState('')
  const [imageValid, setImageValid] = useState(true);
  const [imageUrl, setImageUrl] = useState(null)
  const [boxes, setBoxes] = useState([])
  const [route, setRoute] = useState('signin')
  const [isSignedIn, setSignedIn] = useState(false)
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
    });

  const loadUser = (data) => {
    setUser(
      {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
      }
    );
  }

  const resetState = () => {
    setInput('');
    setImageValid(true);
    setImageUrl(null);
    setBoxes([]);
    setRoute('signin');
    setSignedIn(false);
    setUser({
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
      });
  }

  // useEffect(() => {
  //   console.log('User state updated:', user);
  //   console.log('boxes state updated:', boxes)
  // },[user, boxes])

  const onInputChange = (event) => {
    setInput(event.target.value);
    setImageUrl(event.target.value);
  }

  const onHandleError = () => {
    setImageValid(false);
  };

  const onChangeImageUrl = () => {
    setImageValid(true);
};

  const calculateFaceLocation = (data) => {
    // const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const clarifaiFaces = data.outputs[0].data.regions;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    let faces = [];
    for (let face of clarifaiFaces) {
        faces.push({
        leftCol: face.region_info.bounding_box.left_col * width,
        topRow: face.region_info.bounding_box.top_row * height,
        rightCol: width - (face.region_info.bounding_box.right_col * width),
        bottomRow: height - (face.region_info.bounding_box.bottom_row * height)
        })
      }
    console.log(faces);
    setBoxes(faces);
  }

  const onButtonSubmit = (event) => {
    event.preventDefault()
    document.getElementById('imagelink').value = '';
    
    fetch('http://localhost:3001/imageurl', {
      method: 'post',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        input: imageUrl
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response) {
        calculateFaceLocation(response)
        fetch('http://localhost:3001/image', {
          method: 'put',
          headers: {'content-type' : 'application/json'},
          body: JSON.stringify({
            id: user.id
          })
        })
        .then(response => response.json())
        .then(userEntries => {
          setUser(prevUser => ({
            ...prevUser,
            entries: userEntries
            })
          );
        })
        .catch(err => console.log(err))
      }
    })
    .catch(error => console.log('error', error));
  }

  const onRouteChange = (chroute) => {
    setRoute(chroute);
    if (chroute === 'signout') {
      setSignedIn(false);
      resetState();
    } else if (chroute === 'home') {
      setSignedIn(true);
    }
  }

  return (
    <>
      <div>
        <ParticlesBg className='particles' type="cobweb" bg={true} num={150} color={['#FFFFFF']}/>
        <MouseParticles g={1} color="random" cull="col,image-wrapper" radius="10"/>
        <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
        { route === 'home'
          ? <div>
              <Logo />
              <Rank name={user.name} entries={user.entries}/>
              <ImageLinkForm 
                onInputChange={onInputChange} 
                onButtonSubmit={onButtonSubmit}
                onChangeImageUrl={onChangeImageUrl}
                />
              <FaceRecognition boxes={boxes} imageUrl={imageUrl} imageValid={imageValid} onHandleError={onHandleError}/>
            </div>
          : ( route === 'signin' || route === 'signout'
              ? <SignIn onRouteChange={onRouteChange} loadUser={loadUser}/>
              : <Register onRouteChange={onRouteChange} loadUser={loadUser}/>
            )
        }
      </div>
    </>
  )
}

export default App
