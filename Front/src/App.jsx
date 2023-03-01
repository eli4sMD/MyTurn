import { useReducer } from 'react';
import { AuthContext } from './context/UserContext'
import { reducer } from './context/useReducer'
import AppRouter from './router/AppRouter'

function App() {


  const getUser = ()=> JSON.parse(localStorage.getItem('userData')) || {isLogged: false};

  const [userState, dispatch] = useReducer(reducer, [], getUser);

  return (
    <AuthContext.Provider value={{
      userState,
      dispatch
    }}>
      <AppRouter/>
    </AuthContext.Provider>
  )

}

export default App
