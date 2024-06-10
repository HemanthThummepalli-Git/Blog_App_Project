import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import './App.css';
import Home from './components/Home';
import Signin from './components/Signin';
import Signup from './components/Signup';
import UsersProfile from './components/UsersProfile';
import AuthorProfile from './components/AuthorProfile';
import Articles from './components/Articles';
import Article from './components/Article';
import AddArticle from './components/AddArticle';
import ArticlesByAuthor from './components/ArticlesByAuthor';
import ErrorPage from './ErrorPage';
import FollowAuthors from './components/FollowAuthors';

function App() {

  let router=createBrowserRouter([
    {
      path:'',
      element:<RootLayout/>,
      errorElement:<ErrorPage/>,
      children:[
        {
          path:'',
          element:<Home/>
        },{
          path:'/signin',
          element:<Signin/>
        },{
          path:'/signup',
          element:<Signup/>
        },{
          path:'/usersprofile',
          element:<UsersProfile/>,
          children:[
            {
              path:"articles",
              element:<Articles/>
            },
            {
              path:"article/:articleId",
              element:<Article/>
            },
            {
              path:"",
              element:<Navigate to='/usersprofile/articles'/>
            },
            {
              path:"followauthors",
              element:<FollowAuthors/>
            }
          ]
        },{
          path:'/authorprofile',
          element:<AuthorProfile/>,
          children:[
            {
              path:"newarticle",
              element:<AddArticle/>
            },
            {
              path:"articles-by-author/:author",
              element:<ArticlesByAuthor/>
            },
            {
              path:"",
              element:<Navigate to="/authorprofile/articles-by-author/:author"/>
            },
            {
              path:"article/:articleId",
              element:<Article/>
            }
          ] 
        }
      ]
    }
  ])

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
