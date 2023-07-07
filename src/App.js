import './index.css';
import Header from './Header'
import Footer from './Footer'
import Home from './Home'
import Missing from './Missing'
import Nav from './Nav'
import NewPost from './NewPost'
import PostPage from './PostPage'
import EditPost from './EditPost';
import About from './About'
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import useAxiosFetch from './hooks/useAxiosFetch';
import {  useStoreActions } from 'easy-peasy';


function App() {

  const setPosts = useStoreActions((actions) => actions.setPosts)
  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');
  
  useEffect(() => {
    JSON.parse(localStorage.getItem('New Media'))
    setPosts(data);
  }, [data,setPosts])


  return (
    <div className="App">
      
    <Header title="New Media" />
    <Nav />
    <Routes>
        <Route path='/' element={<Home
        isLoading={isLoading}
        fetchError={fetchError}
        />} />
        <Route path='post'>
          <Route index element={<NewPost />} />
          <Route path=':id' element={<PostPage/>} />
        </Route>

        <Route path="/edit/:id"
          element={<EditPost/>}/>

        <Route path='postpage' element={<PostPage /> } />
        <Route path='about' element={<About />} /> 
        <Route path='*' element={<Missing />} />
    </Routes>
    <Footer />
   
    </div>
  );
}

export default App;
