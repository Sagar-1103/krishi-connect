import {useContext, createContext, useState} from 'react';

const LoginContext = createContext();

const LoginProvider = props => {
  const [user,setUser] = useState(null);
  const [accessToken,setAccessToken] = useState(null);
  const [refreshToken,setRefreshToken] = useState(null);
  const [uploadingImage,setUploadingImage] = useState(null);

  const [tempProduct,setTempProduct] = useState([]);
  return (
    <LoginContext.Provider
      value={{user,setUser,refreshToken,setRefreshToken,accessToken,setAccessToken,uploadingImage,setUploadingImage,tempProduct,setTempProduct}}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;

export const useLogin = () => useContext(LoginContext);